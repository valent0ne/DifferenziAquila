import  {News} from "../models/news.model";

export interface NewsPersistanceInterface{

  save(n: Array<News>): Promise<any>;

  get(): Promise <Array<News>>;

  remove(): Promise<any>;

  retrieveFromServer(): Promise<Array<News>>;
}
