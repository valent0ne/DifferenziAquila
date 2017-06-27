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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwcrPage');
  }

  presentDatePicker() {

    var inputs = [];
    var day = new Date();

    for (var i = 0; i < 30; i++) {
      inputs[i] = new Array();

      var nextDay = new Date(day.getTime() + (i * 24 * 60 * 60 * 1000));
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = nextDay.toDateString();
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
          handler: () => {
            console.log('Buy clicked');
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
          label: '9-11'
        },
        {
          type: 'radio',
          label: '11-13'
        },
        {
          type: 'radio',
          label: '15-17'
        },
        {
          type: 'radio',
          label: '17-19'
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
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}


