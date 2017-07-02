import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

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

  date: string = "scegli un giorno";
  time: string = "scegli una fascia oraria";
  selectedDate : boolean = !(this.date == "scegli un giorno");
  selectedTime : boolean = !(this.time == "scegli una fascia oraria");

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
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
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = nextDay.toDateString();
      inputs[i]['value'] = nextDay.toDateString();


      if(nextDay.getDay() == 0 || nextDay.getDay() == 6){
        inputs[i]['disabled'] = "true";
      }

    }

    let alert = this.alertCtrl.create({
      inputs: inputs,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Ok clicked');
            this.date = data;
            this.selectedDate = true;
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
          label: '9-11',
          value: '9-11'
        },
        {
          type: 'radio',
          label: '11-13',
          value: '11-13'
        },
        {
          type: 'radio',
          label: '15-17',
          value: '15-17'
        },
        {
          type: 'radio',
          label: '17-19',
          value: '17-19'
        }

      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Ok clicked');
            this.time=data;
            this.selectedTime = true;
          }
        }
      ]
    });
    alert.present();
  }
}


