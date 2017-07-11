import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  mmDefault: String = 'mm';
  hhDefault: String = 'hh';
  hh: any = this.hhDefault;
  mm: any = this.mmDefault;
  isToggled: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService) {

    this.isToggled = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  presentHourPicker() {

    if (!this.isToggled) {
      return;
    }

    let inputs = [];

    for (let i = 0; i < 7; i++) {
      inputs[i] = new Array();

      inputs[i]['type'] = "radio";
      inputs[i]['value'] = i + 18;
      inputs[i]['label'] = i + 18;
    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_HOUR"),
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
              this.hh = data;
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentMinutePicker() {

    if (!this.isToggled) {
      return;
    }

    let inputs = [];

    for (let i = 0; i < 4; i++) {
      inputs[i] = new Array();

      inputs[i]['type'] = 'radio';
      if (i == 0) {
        inputs[i]['value'] = "00";
        inputs[i]['label'] = "00";
      } else {
        inputs[i]['value'] = i * 15;
        inputs[i]['label'] = i * 15;
      }
    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_MINUTE"),
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
              this.mm = data;
            }
          }
        }
      ]
    });
    alert.present();
  }


  toggleNotifications() {
    if (!this.isToggled) {
      this.mm = this.mmDefault;
      this.hh = this.hhDefault;
    }
  }

}
