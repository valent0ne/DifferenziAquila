import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Events} from 'ionic-angular';

//Models
import {User} from '../models/user.model';

//Interfaces
import {UserPersistanceInterface} from '../interfaces/userpersistance.interface';

//Providers
import {UserPersistanceProvider} from './user-persistance.provider';
import {DictionaryService} from './dictionary-service/dictionary-service';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

@Injectable()
export class AccountProvider {

    private _user: User = null;
    private _sUserPersistance: UserPersistanceInterface;
    constructor(
        private _http: Http,
        public events: Events,
        private _sDict: DictionaryService,
        sUserPers: UserPersistanceProvider
    ) {
        console.log('Hello Account Provider');

        this._sUserPersistance = sUserPers;
    }

    initialize(): Promise<any> {
        return new Promise(resolve => {
            this._sUserPersistance.get()
                .then(user => {
                    this._user = user;
                    resolve();
                })
                .catch(() => resolve());
        });
    }

    getUser(): User {
        return this._user;
    }

    isLogged(): boolean {
        return this._user !== null;
    }

    login(clientcode: string, rememberMe: boolean): Promise<User> {
        return new Promise((resolve, reject) => {
            this._http.post(URL_BASE + URL.USERS.LOGIN, { clientcode })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        this._user = new User( json.data );
                        if(rememberMe){
                          this._sUserPersistance.save(this._user);
                        }
                        this.events.publish('user:login');

                        resolve(this._user);
                    } else {
                        reject(this._sDict.get("ERROR_LOGIN"));
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get(URL_BASE + URL.USERS.LOGOUT + this._user.token).toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        this._sUserPersistance.remove();
                        this.events.publish('user:logout');

                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }

}
