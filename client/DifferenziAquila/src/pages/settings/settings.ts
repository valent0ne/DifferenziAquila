import {Component} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {NotificationProvider} from "../../providers/notification.provider";
import {MessageProvider} from "../../providers/message.provider";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Notification} from "../../models/notification.model";
import {DatePipe} from "@angular/common";
import {Language} from "../../providers/dictionary-service/types";
import {AccountProvider} from "../../providers/account.provider";


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
  languages: Language[] = [];
  prefLanguage: string = "";
  isLogged:boolean;

  constructor(public app: App,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public sMessage: MessageProvider,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService,
              public sNotifications: NotificationProvider,
              public localNotif: LocalNotifications,
              public datepipe: DatePipe,
              public sAccount:AccountProvider) {

    //controllo se ci sono notifiche già settate
    this.sNotifications.areSet().then((result) => {
      if (result) {
        this.sNotifications.getTime().then((n: Notification)=>{
          this.hh = n.hh;
          this.mm = n.mm;
          this.isToggled = true;
          console.log("[Settings} hh mm retrieved, isToggled = true");
        }).catch(()=>{
          //se per qualche motivo ci sono notifiche schedulate ma hh e mm non
          // possono essere recuperati dallo storage, pulisco tutto
          this.hh = this.hhDefault;
          this.mm = this.mmDefault;
          this.isToggled = false;
          this.sNotifications.clearNotifications();
          console.log("[Settings] cant retrieve hh mm");
        })
      }else{
        this.isToggled = false;
        console.log("[Settings] notifications not scheduled");
      }
    });

    //controllo lingua
    this.languages = this.sDictionary.getLanguages();
    //prefLanguage conterrà en_EN o it_IT
    this.prefLanguage = this.sDictionary.getPreferredLanguage();

    console.log("[Settings] preferred language: "+this.prefLanguage);



    //controllo se è loggato
    this.isLogged = this.sAccount.isLogged();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  presentHourPicker() {

    if (!this.isToggled) {
      return;
    }

    let inputs = [];

    for (let i = 0; i < 6; i++) {
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
              this.applyNotifications();
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
              this.applyNotifications();
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

  addNotification(){
    let day = new Date(new Date().getTime() + 3000);
    console.log("[Settings] notification will be fired at: "+this.datepipe.transform(day, "dd-MM-yyyy HH:mm:ss"));
    this.localNotif.schedule({
      "id": 99999,
      "title": "DifferenziAquila",
      "text": this.sDictionary.get("REMEMBER_TO_TAKE_OUT")+" "+this.sDictionary.get("GLASS"),
      "icon": "icon_notif_glass",
      "at": day
    });
  }


  applyNotifications() {

    if (this.validate()) {
      const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
      loading.present();
      this.sNotifications.initialize(new Notification({"hh":this.hh, "mm":this.mm})).then(() => {

        console.log("[Settings] scheduling notifications");
        let out = this.sNotifications.getNotifications();
        for (let item of out) {

          item.text = this.sDictionary.get("REMEMBER_TO_TAKE_OUT") + " " + this.sDictionary.get(item.text.toUpperCase()).toUpperCase();
          this.localNotif.schedule(item);
        }
        this.sMessage.presentMessage('ok', this.sDictionary.get('SUCCESS_NOTIF'));
        console.log("[Settings] notifications applied");
        loading.dismiss();
      }).catch(() => {
        this.sMessage.presentMessage('warn', this.sDictionary.get('WARNING'));
        console.log("[Settings] cant apply notifications");
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
      });
    }
  }

  onChangeLanguage() {
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();

    this.sDictionary.setPreferredLanguage(this.prefLanguage)
      .then(() => {
        loading.dismiss().then(() => {
          this.app.getRootNav().setRoot('MenuPage');
        });
      })
      .catch(() => {
        console.log("[Settings] cant load dictionary");
        loading.dismiss();
      });
  }

  logout(){
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();

    this.sAccount.logout().then(()=>{
      console.log("[Settings] logout ok");
      this.sMessage.presentMessage('ok', this.sDictionary.get('SUCCESS_LOGOUT'));
      this.isLogged = false;
      loading.dismiss();
    }).catch(()=>{
      console.log("[Settings] cant logout");
      this.sMessage.presentMessage('ko', this.sDictionary.get('KO_LOGOUT'));
      loading.dismiss();

    })

  }

}
