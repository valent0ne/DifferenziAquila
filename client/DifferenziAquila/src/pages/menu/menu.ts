import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {AccountProvider} from "../../providers/account.provider";

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sDictionary: DictionaryService,
              public sAccount: AccountProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


 goTo(destination: string){
    if(this.sAccount.isLogged()){
      this.navCtrl.push(destination);
    }else {
      this.navCtrl.push("LoginPage",{'destination': destination});
    }
 }

}
