import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

//Interface
import {CalendarPersistanceInterface} from '../interfaces/calendarpersistance.interface';

//Models
import {Calendar} from '../models/calendar.model';

//Constants
import {STORAGE_KEYS, URL_BASE, URL, CALENDAR} from '../constants';
import {Http, Response} from "@angular/http";
import {ResponseServer} from "../types";
import {DatePipe} from "@angular/common";
import {isUndefined} from "ionic-angular/util/util";

@Injectable()
export class CalendarPersistanceProvider implements CalendarPersistanceInterface {

  private _calendars: Array<Calendar> = new Array();

  constructor(private _storage: Storage,
              private _http: Http,
              private _datepipe: DatePipe) {
    console.log('Hello CalendarPersistance Provider');
  }


  save(calendar:Array<Calendar>): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.set(STORAGE_KEYS.CALENDAR, calendar)
        .then(() => {
          resolve(calendar);
        })
        .catch(() => {
          reject();
        });
    });
  }

  get(): Promise<Array<Calendar>> {
    return new Promise((resolve, reject) => {
      this._storage.get(STORAGE_KEYS.CALENDAR)
        .then((calendar) => {
          if (calendar !== null && calendar.length > 0) {
            console.log("[CalendarPersistanceProvider] size of calendar in persistence: "+calendar.length);
            resolve(calendar);
            console.log("[CalendarPersistanceProvider] - calendar exists in storage (1st item ->) " +calendar[0].id);
          } else {

            let start = new Date();
            let end = new Date(CALENDAR.DEFAULT_END);
            this._http.get(URL_BASE + URL.CALENDAR.GET + URL.CALENDAR.FROM + this._datepipe.transform(start, "yyyy-MM-dd") +"/"+ URL.CALENDAR.TO + this._datepipe.transform(end, "yyyy-MM-dd")).toPromise()
              .then((res: Response) => {
                console.log("[CalendarPersistanceProvider] - api request launched");

                const json = res.json() as ResponseServer;
                if (json.result) {
                  console.log("[CalendarPersistanceProvider] - result ok");

                  const calendars = json.data;
                  for (let calendar of calendars) {
                    console.log("pushing days from server: "+calendar.id);
                    this._calendars.push(new Calendar({"id":calendar.id, "id_waste":(calendar.wastegategory === null) ? null : calendar.wastecategory.id, "day":calendar.day}));
                  }
                  this.save(this._calendars).then(()=>{
                    resolve(this._calendars);
                    console.log("[CalendarPersistanceProvider] - saved calendar in storage");

                  }).catch(()=>{
                    console.log("[CalendarPersistanceProvider] - catch save calendar storage");
                    reject();
                  })
                }else{
                  console.log("[CalendarPersistanceProvider] - result ko");
                  reject();
                }

              })
              .catch((err) => {
                console.log("[CalendarPersistanceProvider] - api request fail "+ err.toString());

                reject()
              });

          }
        }).catch(()=>{
        console.log("[CalendarPersistanceProvider] - calendar fail to retrieve from storage");

        reject()
      });
    });
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


}
