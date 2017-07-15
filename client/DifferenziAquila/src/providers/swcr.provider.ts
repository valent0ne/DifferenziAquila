import {SpecialWasteRequest} from "../models/specialWasteRequest.model";
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AccountProvider} from './account.provider';
import {URL_BASE, URL} from '../constants';
import {ResponseServer} from "../types";

@Injectable()
export class SpecialWasteCollectionRequestProvider {


  constructor(
    private _http: Http,
    private _sAccount: AccountProvider

  ) {
    console.log('Hello Rsr Provider');
  }






  saveSWRequest(swr: SpecialWasteRequest, id: number): Promise<any>{
    return this.createSWRequest(swr, id);
  }



  private createSWRequest(newSwr: SpecialWasteRequest, id: number) {
    return new Promise((resolve, reject) => {
      console.log("date: " +newSwr.date+ " hour: " +newSwr.hour+ " amount: " +newSwr.amount+ " description: " +newSwr.description+" idsw: "+id);
      this._http.post(URL_BASE + URL.SWCR.CREATE + this._sAccount.getUser().token+"/"+ id, {
        date: newSwr.date,
        hour: newSwr.hour,
        amount: newSwr.amount,
        description: newSwr.description
      })
        .toPromise()
        .then((res: Response) => {
          const json = res.json() as ResponseServer;

          if (json.result) {
            resolve();
          } else {
            console.log ("result=false");
            reject();
          }
        })
        .catch((err) => {
        console.log("errore swcr"+ err.toString());
          reject();
        });
    });
  }
}
