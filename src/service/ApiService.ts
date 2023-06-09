import { injectable } from "inversify";
import mockData from "./mockData";

export type Article = (typeof mockData.data)[number];

export interface ApiResponseType {
  /**
   * Data returned in the response.
   */
  data: Array<Article>;
  /**
   * The responses status code (if applicable).
   */
  status: number;
}

export interface ApiServiceType {
  get: () => Promise<Array<Article>>;
  getById: (id: number) => Promise<Article>;
  filtered: (
    value: string,
    param: "title" | "brand"
  ) => Promise<Array<Article>>;
}

@injectable()
export default class ApiService implements ApiServiceType {
  private static instance: ApiService;

  static get initialized(): ApiService {
    if (!ApiService.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  public get: ApiServiceType["get"] = async () => {
    const response = mockData;
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected error");
    }
  };

  public getById: ApiServiceType["getById"] = async (id) => {
    const response = mockData.data.find((o) => o.id === id);
    if (response) {
      return response;
    } else {
      throw new Error("Could not find article");
    }
  };

  public filtered: ApiServiceType["filtered"] = async (value, param) => {
    const data = await this.get();
    const filteredData = data.filter((item) => {
      return item[param].toLowerCase().includes(value.toLowerCase());
    });
    return filteredData;
  };
}
