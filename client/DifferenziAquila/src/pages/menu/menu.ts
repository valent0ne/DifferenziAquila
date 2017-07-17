import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {AccountProvider} from "../../providers/account.provider";
import {NewsProvider} from "../../providers/news.provider";

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

  public showBadge: number=0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sDictionary: DictionaryService,
              public sAccount: AccountProvider,
              public loadingCtrl: LoadingController,
              public sNews: NewsProvider) {


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MenuPage');
  }

  ionViewDidEnter() {
          this.sNews.updateAmount().then(() => {
            this.showBadge = this.sNews.showBadge;
            console.log("[Menu] there are "+this.showBadge+" new news");
          });

    console.log("ionViewDidEnter MenuPage");
  }


  goTo(destination: string) {
    if (this.sAccount.isLogged()) {
      this.navCtrl.push(destination);
    } else {
      this.navCtrl.push("LoginPage", {'destination': destination});
    }
  }

}
