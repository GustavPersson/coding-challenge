import { Container } from "inversify";
import SearchViewModel from "../pages/search/SearchViewModel";
import ApiService from "../service/ApiService";
import FormatList from "../service/FormatList";


export type Containers = "API_SERVICE" | "FORMAT_LIST_SERVICE" | "SEARCH_PAGE";

const container = new Container();

container.bind('API_SERVICE').to(ApiService).inSingletonScope();
container.bind('FORMAT_LIST_SERVICE').to(FormatList).inSingletonScope();
container.bind("SEARCH_PAGE").to(SearchViewModel).inSingletonScope();

export const appContainer: Container = container;
