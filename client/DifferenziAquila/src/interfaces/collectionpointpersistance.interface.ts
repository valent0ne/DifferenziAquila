
//Models
import {User} from '../models/user.model';

export interface CollectionPointPersistanceInterface {

    save(user: User): Promise<any>;

    get(): Promise<User>;

    remove(): Promise<any>;

    retrieveFromServer(): Promise<Array<Map>>;

}
