import { injectable } from "inversify";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import ApiService, { ApiServiceType, Article } from "../../service/ApiService";

type TableRow = {
  name: string;
  value: number;
  unit?: string;
};

export interface ArticleViewModelType {
  article: Article;
  getArticle: (id: number) => Promise<void>;
  getTableRows: Array<TableRow>;
}

/**
 * View model used for {@link Article} component.
 */
@injectable()
export default class ArticleViewModel implements ArticleViewModelType {
  private apiService: ApiServiceType;
  public article!: Article;

  constructor() {
    this.apiService = new ApiService();

    makeObservable(this, {
      article: observable,
      getArticle: action,
      getTableRows: computed,
    });
  }

  private createData = (
    name: string,
    value: number,
    unit?: string
  ): TableRow => {
    return { name, value, unit };
  };

  get getTableRows(): Array<TableRow> {
    return [
      this.createData("Price", this.article.price, "kr"),
      this.createData("Stock", this.article.stock),
      this.createData("Discount", this.article.discountPercentage, "%"),
    ];
  }

  public getArticle = async (id: number) => {
    try {
      const result = await this.apiService.getById(id);
      runInAction(() => {
        this.article = result;
      });
    } catch (error) {
      console.error("Article not found");
    }
  };
}
