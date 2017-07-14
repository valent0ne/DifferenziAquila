import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Events} from 'ionic-angular';

//Models
import {Calendar} from '../models/calendar.model';

//Interfaces
import {CalendarPersistanceInterface} from '../interfaces/calendarpersistance.interface';

//Providers
import {CalendarPersistanceProvider} from './calendar-persistance.provider';


//Constants
import {CALENDAR} from '../constants';


@Injectable()
export class CalendarProvider {

  private _calendar: Array<Calendar> = new Array();
  private _tempCalendar: Array<Calendar> = new Array();
  private _sCalendarPersistance: CalendarPersistanceInterface;

  constructor(public events: Events,
              sCalendarPers: CalendarPersistanceProvider) {
    console.log('Hello Calendar Provider');

    this._sCalendarPersistance = sCalendarPers;
  }

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._sCalendarPersistance.get()
        .then(calendar => {
        console.log("[CalendarProvider] data from persistence: "+calendar.length);
          for(let item of calendar){
            //console.log("[CalendarProvider] pushing from get (persistence): "+item.id);
            this._calendar.push(new Calendar(item));
          }
          resolve();
        })
        .catch((err) => {
          console.log("[CalendarProvider] - catch initialize "+err.toString());
          reject();
        });
    });
  }

  getCalendar(): Array<Calendar> {
    return this._calendar;
  }

  getNextDays(start: number): Promise<Array<Calendar>> {
    return new Promise((resolve, reject) => {
      console.log("[CalendarProvider] fetching next "+CALENDAR.INFINITE_SCROLL+" entries, starting at index: "+start);
      this._tempCalendar = new Array<Calendar>();
      let temp = this._calendar.slice(start, start+CALENDAR.INFINITE_SCROLL);
      console.log("[CalendarProvider] fetched "+CALENDAR.INFINITE_SCROLL+" entries, current end: "+(start+CALENDAR.INFINITE_SCROLL));
      for(let item of temp){
        //console.log("[CalendarProvider] pushing into tempCalendar: "+item.id);
        this._tempCalendar.push(new Calendar(item));
      }
      console.log("[CalendarProvider] calendar sliced into tempCalendar");
      if (this._tempCalendar.length > 0) {
        console.log("[CalendarProvider] tempCalendar length > 0");
        resolve();
      } else {
        console.log("[CalendarProvider] tempCalendar length = 0");
        reject();
      }
    });
  }

  refresh(): Promise<any>{
    return new Promise((resolve, reject)=>{
        console.log("[CalendarProvider] refreshing...");
        this._sCalendarPersistance.retrieveFromServer().then(()=>{
          console.log("[CalendarProvider] calendar refreshed");
          resolve();
        }).catch(()=>{
          console.log("[CalendarProvider] calendar refreshed failed");
          reject();
        });
    });
  }

  getTempCalendar(): Array<Calendar> {

    return this._tempCalendar;
  }
}
