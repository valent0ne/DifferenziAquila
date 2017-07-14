import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {STORAGE_KEYS, URL_BASE, URL} from '../constants';
import {Http, Response} from "@angular/http";
import {ResponseServer} from "../types";
import {CollectionPointPersistanceInterface} from "../interfaces/collectionpointpersistance.interface";
import {CollectionPoint} from "../models/collectionPoint.model";

@Injectable()
export class CollectionPointPersistanceProvider implements CollectionPointPersistanceInterface {

  private _fromServer: boolean = false;

  constructor(private _storage: Storage,
              private _http: Http) {
    console.log('Hello CollectionPointPersistanceProvider');
  }


  save(collectionpoint: Array<CollectionPoint>): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.set(STORAGE_KEYS.CALENDAR, collectionpoint)
        .then(() => {
          resolve();
        })
        .catch(() => {
          console.log("[CollectionPointPersistanceProvider] save errore ");
          reject();
        });
    });
  }


  get(): Promise<Array<CollectionPoint>> {
    return new Promise((resolve, reject) => {
      this._storage.get(STORAGE_KEYS.COLLECTION_POINT)
        .then((cps) => {
          //se c'è un cp valido nello storage
          if (cps !== null && cps.length > 0) {


            console.log("[CollectionPointPersistanceProvider] size of calendar in persistence: " + cps.length);
            console.log("[CollectionPointPersistanceProvider] calendar exists in storage (1st item ->) " + cps[0].id);

            resolve(cps);
            //se non c'è un cp valido nello storage lo recupero da server
          } else {
            this.retrieveFromServer().then((cps) => {
              console.log("[CollectionPointPersistanceProvider] retrieved cp from server");
              resolve(cps);
            }).catch(() => {
              console.log("[CollectionPointPersistanceProvider] error catch retrieve server ");
              reject();
            });
          }
          //recupero da storage fallito
        }).catch(() => {
        console.log("[CollectionPointPersistanceProvider] - cp fail to retrieve from storage, trying from server");
        this.retrieveFromServer().then((cps) => {
          resolve(cps)
          //recupero da server fallito
        }).catch(() => {
          console.log("[CollectionPointPersistanceProvider] error catch retrieve server");
          reject();
        })
      });
    });
  }


  remove(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.remove(STORAGE_KEYS.COLLECTION_POINT)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
    });
  }


  retrieveFromServer(): Promise<Array<CollectionPoint>> {
    return new Promise((resolve, reject) => {
      this._http.get(URL_BASE + URL.COLLECTION_POINT.GET).toPromise()
        .then((res: Response) => {
          console.log("[CollectionPointPersistanceProvider] - api request launched");

          const json = res.json() as ResponseServer;
          if (json.result) {
            console.log("[CollectionPointPersistanceProvider] - result ok");

            const cps = json.data;
            let out = new Array<CollectionPoint>();
            for (let c of cps) {
              console.log("[CollectionPointPersistence] retriving item: "+c.id+" "+c.latitude+" "+c.longitude+" "+c.description+" "+c.specialwaste.name);
              out.push(new CollectionPoint({
                "id": c.id,
                "longitude": c.longitude,
                "latitude": c.latitude,
                "description": c.description,
                "specialwaste": c.specialwaste.name,
              }));
            }
            this.save(out).then(() => {
              this._fromServer = true;
              console.log("[CollectionPointPersistanceProvider] - saved calendar in storage");
              resolve(out);

            }).catch((err) => {
              console.log("[CollectionPointPersistanceProvider] - catch save calendar storage: " + err.toString());
              reject();
            })
          } else {
            console.log("[CollectionPointPersistanceProvider] - result ko");
            reject();
          }

        })
        .catch(() => {
          console.log("[CollectionPointPersistanceProvider] - api request fail ");
          reject()
        });
    });

  }

}
