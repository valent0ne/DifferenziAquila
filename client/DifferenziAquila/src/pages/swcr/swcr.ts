import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {MessageService} from '../../providers/message-service/message-service';

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

  defaultAmount: String = this.sDictionary.get("AMOUNT");
  defaultCategory: String = this.sDictionary.get("CHOOSE_CAT");
  defaultDate: String = this.sDictionary.get("CHOOSE_DAY");
  defaultTime: String = this.sDictionary.get("CHOOSE_TIME_SLOT");

  date: String = this.defaultDate;
  time: String = this.defaultTime;
  amount: any = this.defaultAmount;
  category: String = this.defaultCategory;
  description: String = "";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService,
              public sMessage: MessageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwcrPage');
  }

  presentDatePicker() {

    let inputs = [];
    let day = new Date();

    for (let i = 0; i < 14; i++) {
      let nextDay = new Date(day.getTime() + (i * 24 * 60 * 60 * 1000));
      inputs[i] = [];
      let item=nextDay.getDate()+' '+this.sDictionary.get((nextDay.getMonth()+1).toString())+' '+nextDay.getFullYear();
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = item;
      inputs[i]['value'] = item;

      if (nextDay.getDay() == 0 || nextDay.getDay() == 6) {
        inputs[i]['disabled'] = "true";
      }

    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_DAY"),
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
            }

          }
        }
      ]
    });
    alert.present();
  }

  presentTimePicker() {
    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_TIME_SLOT"),
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
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentAmountPicker() {

    let inputs = [];

    for (let i = 0; i < 10; i++) {
      inputs[i] = [];
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = i+1;
      inputs[i]['value'] = i+1;

    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("AMOUNT"),
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
              this.amount = data;
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentCategoryPicker() {

    let inputs = [];

    for (let i = 0; i < 10; i++) {
      //riempio con valori da database
      inputs[i] = [];
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = 'pippo';
      inputs[i]['value'] = 'pippo';

    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("AMOUNT"),
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
              this.category = data;
            }
          }
        }
      ]
    });
    alert.present();
  }

  clear(){
    this.date=this.defaultDate;
    this.time=this.defaultTime;
    this.category=this.defaultCategory;
    this.amount=this.defaultAmount;
    this.description="";
  }



}


