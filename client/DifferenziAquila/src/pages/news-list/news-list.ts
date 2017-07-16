import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MessageProvider} from "../../providers/message.provider";
import {DictionaryService} from "../../providers/dictionary-service/dictionary-service";
import {NewsProvider} from "../../providers/news.provider";
import {News} from "../../models/news.model";

/**
 * Generated class for the NewsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html',
})
export class NewsListPage {

  public newsList: Array<News>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sMessage: MessageProvider,
              public sDictionary: DictionaryService,
              public loadingCtrl: LoadingController,
              public sNews: NewsProvider) {

    this.showNewsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsListPage');
  }

  showNewsList(){
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
    loading.present();

    this.sNews.initialize().then(()=>{
     this.newsList= this.sNews.getNewsLIst();
     loading.dismiss();
    }).catch(()=>{
      console.log("[NewsList] catch initialize");
      this.sMessage.presentMessage("warn", this.sDictionary.get("FAILURE"));
      this.navCtrl.push("MenuPage");
      loading.dismiss();
    })
  }



  doRefresh(refresher) {

    this.sNews.refresh().then(() => {
      this.sMessage.presentMessage('ok', this.sDictionary.get("REFRESH_OK"));
      refresher.complete();
    }).catch(() => {
      this.sMessage.presentMessage('ko', this.sDictionary.get("REFRESH_KO"));
      refresher.complete();
    });
  }
}
