import { inject, injectable } from 'inversify';
import { action, makeObservable, observable, runInAction } from "mobx";
import ApiService, { ApiServiceType } from "../../service/ApiService";
import type { FormatListType, FormattedList } from "../../service/FormatList";
import { ChangeEventHandler } from "react";

export interface SearchType {
  searchValue: string;
  searchResults: FormattedList;
  search: (searchValue: string) => Promise<void>;
}

/**
 * View model used for {@link Search} component.
 */
@injectable()
export default class SearchViewModel implements SearchType {
  public searchValue = "";
  public searchResults: FormattedList = [];
  private apiService: ApiServiceType;

  constructor(
    @inject("FORMAT_LIST_SERVICE") private formatListService: FormatListType
  ) {
    this.apiService = new ApiService();

    makeObservable(this, {
      searchResults: observable,
      search: action,
    });
  }

  public search = async (searchValue: string) => {
    const response = await this.apiService.filtered(searchValue, "title");
    const formattedResponse = this.formatListService.formatList(response);

    runInAction(() => {
      this.searchResults = formattedResponse;
    });
  };
}
