import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {CalendarPersistanceInterface} from '../interfaces/calendarpersistance.interface';
import {Calendar} from '../models/calendar.model';
import {STORAGE_KEYS, URL_BASE, URL, CALENDAR} from '../constants';
import {Http, Response} from "@angular/http";
import {ResponseServer} from "../types";
import {DatePipe} from "@angular/common";

@Injectable()
export class CalendarPersistanceProvider implements CalendarPersistanceInterface {

  private _fromServer: boolean = false;

  constructor(private _storage: Storage,
              private _http: Http,
              private _datepipe: DatePipe) {
    console.log('Hello CalendarPersistance Provider');
  }


  save(calendar: Array<Calendar>): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.set(STORAGE_KEYS.CALENDAR, calendar)
        .then(() => {
          resolve();
        })
        .catch(() => {
          console.log("[CalendarPersistanceProvider] save errore " );
          reject();
        });
    });
  }

  getToday(data, filter){
    let result = data.filter(function(obj){
      return obj.day == filter;
    });
    return result ? result[0] : null;
  }

  get(): Promise<Array<Calendar>> {
    return new Promise((resolve, reject) => {
      this._storage.get(STORAGE_KEYS.CALENDAR)
        .then((calendar) => {
          //se c'è un calendario valido nello storage
          if (calendar !== null && calendar.length > 0) {
            let todayDate = this._datepipe.transform(Date.now(), "yyyy-MM-dd");
            let today = this.getToday(calendar, todayDate);
            console.log("[CalendarPersistanceProvider] todayDate: "+todayDate);
            console.log("[CalendarPersistanceProvider] today: "+today.day);

            console.log("[CalendarPersistanceProvider] size of calendar in persistence: " + calendar.length);
            console.log("[CalendarPersistanceProvider] calendar exists in storage (1st item ->) " + calendar[0].id);
            console.log("[CalendarPersistenceProvider] calendar is valid, today is at index: " + today.day + " "+today.id+" "+today.color+" -> " + calendar.indexOf(today));

            this.checkLength(calendar, today).then(()=>{
              resolve(calendar);
            }).catch(()=>{
              console.log("[CalendarPersistanceProvider] catch length");
              reject();
            })
          //se non c'è un calendario valido nello storage lo recupero da server
          } else {
            this.retrieveFromServer().then((calendar) => {
              console.log("[CalendarPersistanceProvider] retrieved calendar from server");
              resolve(calendar);
            }).catch(() => {
              console.log("[CalendarPersistanceProvider] error catch retrieve server ");
              reject();
            });
          }
          //recupero da storage fallito
        }).catch(() => {
        console.log("[CalendarPersistanceProvider] - calendar fail to retrieve from storage, trying from server");
        this.retrieveFromServer().then((calendar) => {
          resolve(calendar)
          //recupero da server fallito
        }).catch(() => {
          console.log("[CalendarPersistanceProvider] error catch retrieve server");
          reject();
        })
      });
    });
  }

  checkLength(calendar, today){
    return new Promise<any>((resolve, reject)=>{

        //controllo che i giorni rimanenti siano sufficienti
        let lengthFromToday = calendar.slice(calendar.indexOf(today), calendar.length).length;
        if( lengthFromToday < CALENDAR.DEFAULT_SIZE){
          console.log("[CalendarPersistanceProvider] calendar length not sufficient, trying to update from server, actual size: "+lengthFromToday);

          //altrimenti aggiorno da server se non è già stato preso da li
          if(!this._fromServer){
            this.retrieveFromServer().then((newCalendar) => {
              console.log("[CalendarPersistanceProvider] updated calendar from server");
              //controllo il calendario aggiornato
              this.checkLength(newCalendar, today).then(()=>{
                console.log("[CalendarPersistanceProvider] updated calendar long enough");
                resolve();
              }).catch(()=>{
                console.log("[CalendarPersistanceProvider] updated calendar still short, aborting...");
                reject();
              });
              //in caso di errore
            }).catch(() => {
              console.log("[CalendarPersistanceProvider] error catch retrieve server ");
              reject();
            });
          }
          //altrimenti anche il server ha il calendario corto
          else{
            console.log("[CalendarPersistanceProvider] calendar already refreshed but still short");
            reject();
          }
          //calendario lungo abbastanza
        }else{
          console.log("[CalendarPersistanceProvider] calendar is long enough");
          resolve();
        }
    })

  }

  remove(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.remove(STORAGE_KEYS.CALENDAR)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
    });
  }

  retrieveFromServer(): Promise<Array<Calendar>> {
    return new Promise((resolve, reject) => {
      let start = new Date();
      let end = new Date(CALENDAR.DEFAULT_END);
      this._http.get(URL_BASE + URL.CALENDAR.GET + URL.CALENDAR.FROM + this._datepipe.transform(start, "yyyy-MM-dd") + "/" + URL.CALENDAR.TO + this._datepipe.transform(end, "yyyy-MM-dd")).toPromise()
        .then((res: Response) => {
          console.log("[CalendarPersistanceProvider] - api request launched");

          const json = res.json() as ResponseServer;
          if (json.result) {
            console.log("[CalendarPersistanceProvider] - result ok");

            const calendars = json.data;
            let out = new Array<Calendar>();
            for (let calendar of calendars) {
              out.push(new Calendar({
                "id": calendar.id,
                "color": ((calendar.wastecategory === null) ? null : calendar.wastecategory.color.toString()),
                "waste_name": ((calendar.wastecategory === null) ? null : calendar.wastecategory.name.toString()),
                "day": calendar.day
              }));
            }
            this.save(out).then(() => {
              this._fromServer=true;
              console.log("[CalendarPersistanceProvider] - saved calendar in storage");
              resolve(out);

            }).catch(() => {
              console.log("[CalendarPersistanceProvider] - catch save calendar storage ");
              reject();
            })
          } else {
            console.log("[CalendarPersistanceProvider] - result ko");
            reject();
          }

        })
        .catch(() => {
          console.log("[CalendarPersistanceProvider] - api request fail ");
          reject()
        });
    });

  }


}
