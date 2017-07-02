import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the RsrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rsr',
  templateUrl: 'rsr.html',
})
export class RsrPage {


  amount = {
    'organico': null,
    'plastica': null,
    'carta': null,
    'indifferenziato': null,
    'vetro': null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RsrPage');
  }

  changeAmount(action, target) {
    switch(action){
      case "+":
      if (this.amount[target] < 5)
        this.amount[target]++;
      break;
      case "-":
      if (this.amount[target] > 0)
        this.amount[target]--;
      break;
    }

  }

}
