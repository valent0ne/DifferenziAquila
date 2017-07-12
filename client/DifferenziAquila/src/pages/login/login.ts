import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {User} from "../../models/user.model";
import {AccountProvider} from "../../providers/account.provider";
import {MessageProvider} from "../../providers/message.provider";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public clientcode: string="";
  public rememberMe: boolean=true;
  public destination: string="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sDictionary: DictionaryService,
              public sAccount:AccountProvider,
              public loadingCtrl: LoadingController,
              public sMessage: MessageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._validate().then(() => {
      const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
      loading.present();

      this.sAccount.login(this.clientcode, this.rememberMe)
        .then((user: User) => {
          console.log("logged: ", user);
          this.sMessage.presentMessage("ok",this.sDictionary.get("LOGIN_OK"));
          this.navCtrl.push(this.navParams.get("destination"), {'fromLogin':true});

          loading.dismiss();
        })
        .catch((msg) => {
          console.log("errore login: non mi sono riuscito a loggare");

          loading.dismiss().then(() => {
            this.sMessage.presentMessage("ko",this.sDictionary.get("FAILURE"));
          });
        });
    }).catch(() => {});
  }


  private _validate() {
    return new Promise((resolve, reject) => {
      let msg = "";
      if (this.clientcode.trim() === "") {
        msg = this.sDictionary.get("WARNING_CLIENTCODE_EMPTY");
      }

      if (msg !== "") {
        this.sMessage.presentMessage('warn',msg);

        reject();
      } else {
        resolve();
      }
    });
  }


}
