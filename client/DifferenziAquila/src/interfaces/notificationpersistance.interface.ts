
import {Notification} from "../models/notification.model";

export interface NotificationPersistanceInterface {

    save(n: Notification): Promise<any>;

    get(): Promise<Notification>;

    remove(): Promise<any>;

}
