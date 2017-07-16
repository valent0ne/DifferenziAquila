import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MessageProvider} from "../../providers/message.provider";
import {DictionaryService} from "../../providers/dictionary-service/dictionary-service";
import {NewsProvider} from "../../providers/news.provider";
import {News} from "../../models/news.model";

/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public singleNews: News = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sMessage: MessageProvider,
              public sDictionary: DictionaryService,
              public loadingCtrl: LoadingController,
              public sNews: NewsProvider) {
    this.singleNews=this.sNews.getSingleNews(this.navParams.get("id"));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }


}
