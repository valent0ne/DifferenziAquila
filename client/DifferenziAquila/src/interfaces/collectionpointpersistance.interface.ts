//Models
import {CollectionPoint} from "../models/collectionPoint.model";

export interface CollectionPointPersistanceInterface {

    save(c: Array<CollectionPoint>): Promise<any>;

    get(): Promise<Array<CollectionPoint>>;

    remove(): Promise<any>;

    retrieveFromServer(): Promise<Array<CollectionPoint>>;

}
