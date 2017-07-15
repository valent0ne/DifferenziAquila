import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LocalNotifications } from '@ionic-native/local-notifications';

//Models
import {Notification} from '../models/notification.model';
import {Calendar} from '../models/calendar.model';

//Providers
import {DictionaryService} from './dictionary-service/dictionary-service';
import {CalendarPersistanceProvider} from './calendar-persistance.provider';

//Constants
import {NOTIFICATION} from '../constants';
import {CalendarPersistanceInterface} from "../interfaces/calendarpersistance.interface";
import {DatePipe} from "@angular/common";
import {isUndefined} from "ionic-angular/util/util";


@Injectable()
export class NotificationProvider {

  private _notifications: Array<Notification> = null;
  private _sCalendarPers: CalendarPersistanceInterface;
  private _hh: number = null;
  private _mm: number = null;

  constructor(private _sDict: DictionaryService,
              private sCalendarPers: CalendarPersistanceProvider,
              private datepipe: DatePipe,
              private localNotif: LocalNotifications
              ) {
    console.log('Hello Notification Provider');

    this.sCalendarPers = sCalendarPers;
  }

  initialize(hh: number, mm: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hh = hh;
      this._mm = mm;
      //pulisco tutto prima di cominciare
      this.clearNotifications().then(()=>{
        //recupero il calendario
        this._sCalendarPers.get()
          .then((calendar: Array<Calendar>) => {
            for (let day of calendar) {
              //se per qualche motivo il giorno attuale è precedente ad oggi lo ignoro
              if (this.datepipe.transform(day.day, "yyy-MM-dd") < this.datepipe.transform(Date.now(), "yyy-MM-dd")) {
                continue;
              }
              console.log("[NotificationProvider] pushing notifications: day = " + day.day + " waste = " + day.waste_name);
              //creo ed inserisco una notifica nell'array per ogni giorno sul calendario

              //calcolo "ieri" rispetto al calendario e aggiungo hh ore e mm minuti
              let correctTime = (day.day.getTime() - (24 * 60 * 60 * 1000) + (hh* 60 * 60 * 1000) + (mm * 60 * 1000));
              console.log("[NotificationProvider] notification will be pushed at -> "+this.datepipe.transform(correctTime, "yyy-MM-dd hh:mm"));
              this._notifications.push(new Notification({
                "id": day.id,
                "title": NOTIFICATION.DEFAULT_TITLE,
                "text": this._sDict.get("REMEMBER_TO_TAKE_OUT") + " " + this._sDict.get(day.waste_name.toString().toUpperCase()),
                //imposto la notifica al giorno prima rispetto al giorno sul calendario
                "at": correctTime,
                "led": NOTIFICATION.DEFAULT_LED
              }));
            }
            console.log("[NotificationProvider] notifications successfully pushed, amount: " + this._notifications.length);
            //applico le notifiche caricate
            this.applyNotifications().then(()=>{
              console.log("[NotificationProvider] notifications pushed and applied successfully");
              resolve();
            }).catch(()=>{
              reject();
            });
          })
          .catch(() => {
            console.log("[NotificationProvider] catch inizialize (get calendar)");
            reject();
          });
      }).catch(()=>{
        reject();
      });
    });
  }

  applyNotifications(): Promise<any>{
    return new Promise((resolve, reject)=>{
      //se non ho notifiche
      if(isUndefined(this._notifications) || this._notifications === null || this._notifications.length<1){
        console.log("[NotificationProvider] no notifications from initialize");
        reject();
      }else{
        //altrimenti setto le notifiche
          this.localNotif.schedule(this._notifications);
          console.log("[NoptificationProvider] notifications applied");
          resolve();
        }
    });
  }

  clearNotifications(): Promise<any>{
    return new Promise((resolve)=>{
      //pulisco tutto
      this.localNotif.cancelAll().then(()=>{
        this._notifications = new Array();
        console.log("[NotificationProvider] notifications cleared");
        resolve();
        //se il cancellAll va male
      }).catch(()=>{
        console.log("[NotificationProvider] cant clear notifications");
        resolve();
      });
    });
  }

  areSet(): Promise<boolean>{
    return new Promise((resolve)=>{
      resolve(!isUndefined(this._notifications) && this._notifications !== null && this._notifications.length>0);
    });
  }

  getHh(){
    return this._hh;
  }

  getMm(){
    return this._mm;
  }
}
