import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Calendar} from '../models/calendar.model';
import {CalendarPersistanceProvider} from './calendar-persistance.provider';
import {NOTIFICATION} from '../constants';
import {CalendarPersistanceInterface} from "../interfaces/calendarpersistance.interface";
import {DatePipe} from "@angular/common";
import {isUndefined} from "ionic-angular/util/util";
import {NotificationPersistanceProvider} from "./notification-persistance.provider";
import {NotificationPersistanceInterface} from "../interfaces/notificationpersistance.interface";
import {Notification} from "../models/notification.model";

@Injectable()
export class NotificationProvider {

  private _sCalendarPers: CalendarPersistanceInterface;
  private _sNotifPers: NotificationPersistanceInterface;
  private _notifications: any = null;


  constructor(private sCalendarPers: CalendarPersistanceProvider,
              private datepipe: DatePipe,
              private sNotifPers: NotificationPersistanceProvider,
              private localNotif: LocalNotifications) {
    console.log('Hello Notification Provider');

    this._sCalendarPers = sCalendarPers;
    this._sNotifPers = sNotifPers;
  }

  initialize(n: Notification): Promise<any> {


    return new Promise((resolve, reject) => {
      //pulisco tutto prima di cominciare
      this.clearNotifications().then(() => {
        //recupero il calendario
        this._sCalendarPers.get()
          .then((calendar: Array<Calendar>) => {
            console.log("[NotificationProvider] get calendar from persistance successfull");

            for (let day of calendar) {
              //se per qualche motivo il giorno attuale è precedente ad oggi lo ignoro
              if (this.datepipe.transform(day.day, "yyy-MM-dd") <= this.datepipe.transform(Date.now(), "yyyy-MM-dd")
                || day.waste_name == null
                || day.waste_name == ""
                || isUndefined(day.waste_name)
              ) {
                continue;
              }
              console.log("[NotificationProvider] pushing notifications: day = " + day.day + " waste = " + day.waste_name);
              //creo ed inserisco una notifica nell'array per ogni giorno sul calendario


              //imposto la notifica al giorno prima rispetto al giorno sul calendario
              let d = new Date(day.day);
              let correctTime: Date = new Date(d.getTime() - (24*60*60*1000) + (n.hh*60*60*1000) +  (n.mm*60*1000));

              console.log("[NotificationProvider] notification will be pushed at -> " + this.datepipe.transform(correctTime, "yyyy-MM-dd HH:mm"));

              this._notifications.push({
                "id": day.id,
                "title": NOTIFICATION.DEFAULT_TITLE,
                "text": day.waste_name,
                "icon": 'icon_notif',
                "at": correctTime
              });


            }
            console.log("[NotificationProvider] notifications successfully scheduled");

            this._sNotifPers.save(n).then(()=>{
              console.log("[NotificationProvider] hh:mm saved in storage");
              resolve();
            }).catch(()=>{
              reject();
            });
          }).catch(() => {
            console.log("[NotificationProvider] catch inizialize (get calendar)");
            reject();
          });
      });
    });

  }

  getNotifications() {
    return this._notifications;
  }


  clearNotifications(): Promise<any> {
    return new Promise((resolve => {
      this._notifications = new Array<any>();
      //pulisco tutto
      this.localNotif.cancelAll().then(() => {
        console.log("[NotificationProvider] notifications cleared");
        this._sNotifPers.remove().then(() => {
          console.log("[NotificationProvider] notification data cleared from storage");
          resolve();
        }).catch(() => {
          console.log("[NotificationProvider] cant clear notification data from storage");
          resolve();
        });
      }).catch(() => {
        console.log("[NotificationProvider] clear failed");
        resolve();
      })
    }));
  }

  areSet(): Promise<boolean> {
    return new Promise((resolve) => {
      this.localNotif.getAllScheduled().then((num) => {
        resolve(num.length > 0);
      }).catch(() => {
        resolve(false);
      });
    });
  }

  getTime(): Promise<Notification> {
    return new Promise((resolve) => {
      this._sNotifPers.get().then((n) => {
        resolve(n);
      }).catch(() => {
        console.log("[NotificationProvider] cant retrieve hh mm");
        resolve(null);
      });
    });
  }

}
