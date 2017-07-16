import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


import {Notification} from '../models/notification.model';
import {STORAGE_KEYS} from '../constants';
import {NotificationPersistanceInterface} from "../interfaces/notificationpersistance.interface";

@Injectable()
export class NotificationPersistanceProvider implements NotificationPersistanceInterface {

    constructor(private _storage: Storage) {
        console.log('Hello NotificationPersistance Provider');
    }

    save(n: Notification): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.NOTIFICATION, n)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    get(): Promise<Notification> {
        return new Promise((resolve, reject) => {
            this._storage.get(STORAGE_KEYS.NOTIFICATION)
                .then((n) => {
                    if (n !== null) {
                        resolve(new Notification(n));
                    } else {
                        reject();
                    }
                })
        });
    }

    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.NOTIFICATION)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
