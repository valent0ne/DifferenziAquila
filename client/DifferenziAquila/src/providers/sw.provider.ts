import {SpecialWaste} from "../models/specialWaste.model";
import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';





//Constants
import {URL_BASE, URL} from '../constants';
import {ResponseServer} from "../types";



@Injectable()
export class SpecialWasteProvider {


  constructor(
    private _http: Http,

  ) {
    console.log('Hello SpecialWaste Provider');
  }



  public get() {
    return new Promise((resolve, reject) => {
      this._http.get(URL_BASE + URL.SW.GET)
        .toPromise()
        .then((res: Response) => {
          const json = res.json() as ResponseServer;

          let sws= new Array<SpecialWaste>();
          if (json.result) {
            const data=json.data;
            for(let item of data){
              console.log("inserting=> id: "+item.id+" name: "+item.name);
              sws.push(new SpecialWaste({"id":item.id,"name":item.name}));
            }

            resolve(sws);
          } else {
            reject();
          }
        })
        .catch((err) => {
          console.log("[SpecialWasteProvider] err: "+err.toString());
          reject();
        });
    });
  }
}
