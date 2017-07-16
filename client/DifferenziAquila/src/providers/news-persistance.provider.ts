import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {STORAGE_KEYS, URL_BASE, URL} from '../constants';
import {Http, Response} from "@angular/http";
import {ResponseServer} from "../types";
import {NewsPersistanceInterface} from "../interfaces/newspersistance.interface";
import {News} from "../models/news.model";
import {DatePipe} from "@angular/common";

@Injectable()
export class NewsPersistanceProvider implements NewsPersistanceInterface{

  private _fromServer: boolean = false;

  constructor(private _storage: Storage,
              private _http: Http,
              private datepipe: DatePipe
  ) {
    console.log('Hello NewsPersistanceProvider');
  }


  save(newsArray: Array<News>):Promise<any>{
    return new Promise((resolve, reject)=>{
      this._storage.set(STORAGE_KEYS.NEWS,newsArray)
        .then(()=>{
          resolve();
        }).catch(()=>{
          console.log("[NewsPercictanceProvider] save error");
          reject();
      })
    });
  }


  get(): Promise<Array<News>>{
    return new Promise ((resolve, reject)=>{
      this._storage.get(STORAGE_KEYS.NEWS)
        .then((n)=>{
          //se c'è una news valida nello storage
          if(n!==null && n.length > 0){
            console.log("[NewsPersistanceProvider] size of n in persistence: " + n.length);
            console.log("[NewsPersistanceProvider] n exists in storage (1st item ->) " + n[0].id);

            resolve(n);
          }
          //se non c'è un n valido nello storage lo recupero da server
          else{
            this.retrieveFromServer().then((n)=>{
              console.log("[NewsPersistanceProvider] retrieved n from server");
              resolve(n);
            }).catch(()=>{
              console.log("[NewsPersistanceProvider] error catch retrieve server ");
              reject();
            });
          }
          //recupero dastorage fallito
        }).catch(()=>{
            console.log("[NewsPersistanceProvider] - n fail to retrieve from storage, trying from server");
            this.retrieveFromServer().then((n)=>{
              resolve(n);
            //Recupero da server fallito
            }).catch(()=>{
                console.log("[NewsPersistanceProvider] error catch retrieve server");
                reject();
            })
        });
    });

  }

  remove(){
    return new Promise((resolve, reject) => {
      this._storage.remove(STORAGE_KEYS.NEWS)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
    });
  }

  retrieveFromServer(): Promise<Array<News>> {
    return new Promise((resolve, reject) => {
      this._http.get(URL_BASE + URL.NEWS.GET).toPromise()
        .then((res: Response) => {
          console.log("[NewsProvider] - api request launched");

          const json = res.json() as ResponseServer;
          if (json.result) {
            console.log("[NewsPersistanceProvider] - result ok");

            const newsArray= json.data;
            let out = new Array<News>();
            for (let n of newsArray) {
              //console.log("[NewsPersistence] retriving item: "+n.id+" "+n.title+" "+n.body+" "+n.date);
              out.push(new News({
                "id": n.id,
                "title": n.title,
                "body": n.body,
                "date": this.datepipe.transform(n.date, "dd-MM-yyyy")
              }));
            }
            this.save(out).then(() => {
              this._fromServer = true;
              console.log("[NewsPersistanceProvider] - saved n in storage");
              resolve(out);

            }).catch(() => {
              console.log("[NewsPersistanceProvider] - catch n calendar storage ");
              reject();
            })
          } else {
            console.log("[NewsPersistanceProvider] - result ko");
            reject();
          }

        })
        .catch(() => {
          console.log("[NewsPersistanceProvider] - api request fail ");
          reject()
        });
    });
  }
}
















