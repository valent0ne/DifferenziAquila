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
  public showBadge: number;

  constructor(public events: Events,
              sNewsPers: NewsPersistanceProvider) {
    console.log('Hello News Provider');

    this._sNewsPersistance = sNewsPers;
  }

  initialize(): Promise<any> {
    this._newsArray = new Array();
    return new Promise((resolve, reject) => {
      this._sNewsPersistance.get()
        .then((n) => {
          console.log("[NewsProvider] data from persistence: " + n.length);
          for (let item of n) {
            this._newsArray.push(new News(item));
          }
          if(this.showBadge > 0){
            this.refresh().then((out)=>{
              console.log("[NewsProvider] delta > 0, refreshing news from server...");
              for (let item of out) {
                this._newsArray.push(new News(item));
              }
              this.showBadge = 0;
            })
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
      this._sNewsPersistance.retrieveFromServer().then((out) => {
        console.log("[NewsProvider] news refreshed");
        this.showBadge = 0;
        resolve(out);
      }).catch(() => {
        console.log("[NewsProvider] news refreshed failed");
        reject();
      });
    });
  }


  getSingleNews(id: number) {
    let result = this._newsArray.filter(function (obj) {
      return obj.id == id;
    });
    return result ? result[0] : null;
  }

  updateAmount(): Promise<any> {
    return new Promise((resolve) => {

      this._sNewsPersistance.getAmountFromStorage().then((n) => {
        let old = n;
        this._sNewsPersistance.getAmountFromServer().then((s) => {
          let updated = s;
          let delta = updated - old;
          this.showBadge = delta;
          console.log("[NewsProvider] found new " + delta + " news on server");
          resolve();
        }).catch(()=>{
          resolve();
        })
      }).catch(() => {
        this.showBadge = 0;
        resolve();
      })
    });
  }
}


























