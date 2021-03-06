import {RecyclingSack} from "../models/recyclingSack.model";
import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';





//Constants
import {URL_BASE, URL} from '../constants';
import {ResponseServer} from "../types";



@Injectable()
export class RecyclingSackProvider {


  constructor(
    private _http: Http,

  ) {
    console.log('Hello Rsr Provider');
  }



  public get() {
    return new Promise((resolve, reject) => {
        this._http.get(URL_BASE + URL.RS.GET)
        .toPromise()
        .then((res: Response) => {
          const json = res.json() as ResponseServer;

          let rss= new Array<RecyclingSack>();
          if (json.result) {
            const data=json.data;
            for(let item of data){
              console.log("inserting=> id: "+item.id+" name: "+item.name+" color: "+item.wastecategory.color);
              rss.push(new RecyclingSack({"id":item.id,"name":item.name, "color":item.wastecategory.color.toString()}));
            }

            resolve(rss);
          } else {
            reject();
          }
        })
        .catch((err) => {
          console.log("[RecyclingSackProvider] err: "+err.toString());
          reject();
        });
    });
  }
}
