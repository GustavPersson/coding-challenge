import { injectable } from "inversify";
import { Article } from "./ApiService";

export type FormattedList = Array<
  Pick<Article, "id" | "title" | "description" | "price">
>;

export interface FormatListType {
  formatList: (list: Array<Article>) => FormattedList;
}

@injectable()
export default class FormatList implements FormatListType {
  public formatList: FormatListType["formatList"] = (list) => {
    return list.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
      };
    });
  };
}
