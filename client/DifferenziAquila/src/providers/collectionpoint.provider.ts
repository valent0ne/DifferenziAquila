import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Events} from 'ionic-angular';

import {CollectionPoint} from "../models/collectionPoint.model";
import {CollectionPointPersistanceInterface} from "../interfaces/collectionpointpersistance.interface";
import {CollectionPointPersistanceProvider} from "./collectionpoint-persistance.provider";


@Injectable()
export class CollectionPointProvider {

  private _cps: Array<CollectionPoint> = new Array();
  private _sCollectionPointPersistance: CollectionPointPersistanceInterface;

  constructor(public events: Events,
              sCollectionPers: CollectionPointPersistanceProvider) {
    console.log('Hello CollectionPoint Provider');

    this._sCollectionPointPersistance = sCollectionPers;
  }


  initialize(): Promise<any> {
    this._cps=new Array<CollectionPoint>();
    console.log("[CollectionPointProvider] _cps cleared, size: "+this._cps.length);
    return new Promise((resolve, reject) => {
      this._sCollectionPointPersistance.get()
        .then((c) => {
        console.log("[CollectionPointProvider] data from persistence: "+c.length);
          for(let item of c){
            this._cps.push(new CollectionPoint(item));
          }
          resolve();
        })
        .catch(() => {
          console.log("[CollectionPointProvider] - catch initialize ");
          reject();
        });
    });
  }

  getCollectionPoints(): Array<CollectionPoint>{
    return this._cps;
  }


  refresh(): Promise<any>{
    this._cps=new Array<CollectionPoint>();
    return new Promise((resolve, reject)=>{
        console.log("[CollectionPointProvider] refreshing...");
        this._sCollectionPointPersistance.retrieveFromServer().then(()=>{
          console.log("[CollectionPointProvider] cps refreshed");
          resolve();
        }).catch(()=>{
          console.log("[CollectionPointProvider] cps refreshed failed");
          reject();
        });
    });
  }

}

