import {Injectable} from '@angular/core';
import {WasteCategory} from "../models/wasteCategory.model";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';





//Constants
import {URL_BASE, URL} from '../constants';
import {ResponseServer} from "../types";



@Injectable()
export class WasteCategoryProvider {


  constructor(
    private _http: Http,

  ) {
    console.log('Hello Rsr Provider');
  }



  public get(): Promise<Array<WasteCategory>> {
    return new Promise((resolve, reject) => {
        this._http.get(URL_BASE + URL.WASTE_CATEGORY.GET)
        .toPromise()
        .then((res: Response) => {
          const json = res.json() as ResponseServer;

          let wcs= new Array<WasteCategory>();
          if (json.result) {
            const data=json.data;
            for(let item of data){
              wcs.push(new WasteCategory(item));
            }

            resolve(wcs);
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  }
}
