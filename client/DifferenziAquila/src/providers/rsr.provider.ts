import {RecyclingSackRequest} from "../models/recyclingSackRequest.model";
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AccountProvider} from './account.provider';

//Constants
import {URL_BASE, URL} from '../constants';
import {ResponseServer} from "../types";



@Injectable()
export class RecyclingSackRequestProvider {


  constructor(
    private _http: Http,
    private _sAccount: AccountProvider

  ) {
    console.log('Hello Rsr Provider');
  }






  saveRSRequest(rsr: RecyclingSackRequest, id: number): Promise<any>{
    return this.createRSRequest(rsr, id);
  }



  private createRSRequest(newRsr: RecyclingSackRequest, id: number) {
    return new Promise((resolve, reject) => {
      this._http.post(URL_BASE + URL.RSR.CREATE + this._sAccount.getUser().token+"/"+ id, {
        amount: newRsr.amount,
        date: newRsr.date
      })
        .toPromise()
        .then((res: Response) => {
          const json = res.json() as ResponseServer;

          if (json.result) {
            resolve();
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
