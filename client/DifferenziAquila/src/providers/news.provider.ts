import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Events} from 'ionic-angular';
import {News} from "../models/news.model";
import {NewsPersistanceInterface} from "../interfaces/newspersistance.interface";
import  {NewsPersistanceProvider} from "./news-persistance.provider";

@Injectable()
export class NewsProvider {

  private _newsArray: Array<News> = new Array();
  private _sNewsPersistance: NewsPersistanceInterface;

  constructor(public events: Events,
              sNewsPers: NewsPersistanceProvider) {
    console.log('Hello News Provider');

    this._sNewsPersistance = sNewsPers;
  }

  initialize(): Promise<any> {
    this._newsArray = new Array<News>();
    console.log("[NewsProvider] _newsArray cleared, size: " + this._newsArray.length);
    return new Promise((resolve, reject) => {
      this._sNewsPersistance.get()
        .then((n) => {
          console.log("[NewsProvider] data from persistence: " + n.length);
          for (let item of n) {
            this._newsArray.push(new News(item));
          }
          resolve();
        })
        .catch(() => {
          console.log("[NewsProvider] - catch initialize ");
          reject();
        });
    });
  }


  getNewsLIst(): Array<News> {
    return this._newsArray;
  }


  refresh(): Promise<any> {
    this._newsArray = new Array<News>();
    return new Promise((resolve, reject) => {
      console.log("[NewsProvider] refreshing...");
      this._sNewsPersistance.retrieveFromServer().then(() => {
        console.log("[NewsProvider] cps refreshed");
        resolve();
      }).catch(() => {
        console.log("[NewsProvider] cps refreshed failed");
        reject();
      });
    });
  }


  getSingleNews(id:number){
    let result = this._newsArray.filter(function(obj){
      return obj.id == id;
    });
    return result ? result[0] : null;
  }

}


























