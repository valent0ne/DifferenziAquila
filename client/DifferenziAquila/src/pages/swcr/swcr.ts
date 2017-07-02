import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';


/**
 * Generated class for the SwcrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-swcr',
  templateUrl: 'swcr.html',
})
export class SwcrPage {

  date: string = this.sDictionary.get("CHOOSE_DAY");
  time: string = this.sDictionary.get("CHOOSE_TIME_SLOT");
  selectedDate: boolean = !(this.date == this.sDictionary.get("CHOOSE_DAY"));
  selectedTime: boolean = !(this.time == this.sDictionary.get("CHOOSE_TIME_SLOT"));

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwcrPage');
  }

  presentDatePicker() {

    let inputs = [];
    let day = new Date();

    for (let i = 0; i < 14; i++) {
      let nextDay = new Date(day.getTime() + (i * 24 * 60 * 60 * 1000));
      inputs[i] = new Array();
      let item=nextDay.getDate()+' '+this.sDictionary.get((nextDay.getMonth()+1).toString())+' '+nextDay.getFullYear();
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = item;
      inputs[i]['value'] = item;

      if (nextDay.getDay() == 0 || nextDay.getDay() == 6) {
        inputs[i]['disabled'] = "true";
      }

    }

    let alert = this.alertCtrl.create({
      inputs: inputs,
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.date = data;
              this.selectedDate = true;
            }

          }
        }
      ]
    });
    alert.present();
  }


  presentTimePicker(item) {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          type: 'radio',
          label: '9 - 11',
          value: '9 - 11'
        },
        {
          type: 'radio',
          label: '11 - 13',
          value: '11 - 13'
        },
        {
          type: 'radio',
          label: '15 - 17',
          value: '15 - 17'
        },
        {
          type: 'radio',
          label: '17 - 19',
          value: '17 - 19'
        }

      ],
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.time = data;
              this.selectedTime = true;
            }
          }
        }
      ]
    });
    alert.present();
  }
}


