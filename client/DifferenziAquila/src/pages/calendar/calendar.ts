import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ViewController} from 'ionic-angular';
import {Calendar} from "../../models/calendar.model";
import {CalendarProvider} from "../../providers/calendar.provider";
import {MessageProvider} from "../../providers/message.provider";
import {DictionaryService} from "../../providers/dictionary-service/dictionary-service";
import {CALENDAR} from "../../constants";
import {DatePipe} from "@angular/common";
import {WasteCategory} from "../../models/wasteCategory.model";


/**
 * Generated class for the CalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  items: Array<Calendar> = new Array();

  month: string = "";
  year: string = "";
  index: number = 0;
  waste_categories: Map<number, WasteCategory> = new Map();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public sCalendar: CalendarProvider,
              public sMessage: MessageProvider,
              public sDictionary: DictionaryService,
              public datepipe: DatePipe) {


    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  initialize() {
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
    loading.present();

    //inizializzo calendario
    this.sCalendar.initialize().then(() => {
      //ottengo primo slot di giorni
      this.sCalendar.getNextDays(this.index).then(() => {
        let data = this.sCalendar.getTempCalendar();
        console.log("[Calendar] size of data from nextDays, tempCalendar (and 1st item) " + data.length + " - " + data[0].id);
        for (let obj of data) {
          this.items.push(obj);
        }
        //aggiorno mese/anno in alto
        this.updateMonthYear(0).then(() => {
          loading.dismiss();

        }).catch(() => {
          console.log("[Calendar] error update month-year initialize: " );
        });

      }).catch(() => {
        loading.dismiss().then(() => {
          this.sMessage.presentMessage('warn', this.sDictionary.get("ERROR_CALENDAR"));
          console.log("catch getNextDays ");
        })

      });
    }).catch(() => {
        console.log("[Calendar] catch initialize, return to main menu");

          this.sMessage.presentMessage('ko', this.sDictionary.get("ERROR_CALENDAR"));
          this.navCtrl.push("MenuPage");
          loading.dismiss();

    });
  }


  updateMonthYear(index: number): Promise<any> {
    return new Promise((resolve) => {
      console.log("index: " + index);
      console.log("items[index]: " + this.items[index].day);
      this.month = this.sDictionary.get(this.datepipe.transform(this.items[index].day, "M"));
      this.year = this.datepipe.transform(this.items[index].day, "y");
      resolve();
    });
  }

  doRefresh(refresher){

    this.sCalendar.refresh().then(()=>{
        this.sMessage.presentMessage('ok', this.sDictionary.get("REFRESH_OK"));
        refresher.complete();
      }).catch(()=>{
        this.sMessage.presentMessage('ko', this.sDictionary.get("REFRESH_KO"));
        refresher.complete();
    });

  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.index += CALENDAR.INFINITE_SCROLL;
        this.sCalendar.getNextDays(this.index).then(() => {
          let data = this.sCalendar.getTempCalendar();
          for (let obj of data) {
            this.items.push(obj);
          }
          console.log('Async operation has ended');
          this.updateMonthYear(this.index - 1).then(() => {
            resolve();
          }).catch(() => {
            console.log("[Calendar] error update month-year infinite scroll: index -> " + this.index);
            reject();
          })
        }).catch((() => {
          console.log("[Calendar] catch getNextDays in infinite scroll err: ");
          reject();
        }));
      }, 333);
    });
  }

}


