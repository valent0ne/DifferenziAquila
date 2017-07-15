import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {NotificationProvider} from "../../providers/notification.provider";
import {MessageProvider} from "../../providers/message.provider";


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
              public loadingCtrl: LoadingController,
              public sMessage: MessageProvider,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService,
              public sNotifications: NotificationProvider) {

    //controllo se ci sono notifiche già settate
    this.sNotifications.areSet().then((result) => {
      this.isToggled = result;
      if (this.isToggled) {
        this.hh = this.sNotifications.getHh();
        this.mm = this.sNotifications.getMm();
      }
    });

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
              this.applyWatcher();
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
              this.applyWatcher();
            }
          }
        }
      ]
    });
    alert.present();
  }

  validate(): boolean {
    return (this.hh != this.hhDefault &&
      this.hh !== null &&
      this.hh != '' &&

      this.mm != this.mmDefault &&
      this.mm !== null &&
      this.mm != ''
    );
  }

  applyWatcher() {
    if (this.validate()) {
      const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
      loading.present();
      this.sNotifications.initialize(this.hh, this.mm).then(() => {
        this.sMessage.presentMessage('ok', this.sDictionary.get('SUCCESS'));
        console.log("[Settings] notification applied")
        loading.dismiss();
      }).catch(() => {
        this.sMessage.presentMessage('warn', this.sDictionary.get('WARNING'));
        console.log("[Settings] cant apply notifications")
        loading.dismiss();
      });
    } else {
      //manca o hh o mm, non fare niente
    }

  }

  toggleNotifications() {
    if (!this.isToggled) {
      this.sNotifications.clearNotifications().then(() => {
        this.mm = this.mmDefault;
        this.hh = this.hhDefault;
      }).catch(() => {
        console.log("[Settings] toggleNotifications");
      })

    }
  }

}
