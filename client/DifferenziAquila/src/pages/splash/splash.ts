import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//import {MenuPage} from "../menu/menu";

/**
 * Generated class for the SplashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
    this.ready();
  }

  ready(){
    setTimeout( () => {
      this.navCtrl.push('MenuPage');
    }, 1750);
  }

}
