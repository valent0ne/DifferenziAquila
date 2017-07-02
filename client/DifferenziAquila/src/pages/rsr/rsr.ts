import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';


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

  default_amount: any=1;
  amount = {
    'organico': this.default_amount,
    'plastica': this.default_amount,
    'carta': this.default_amount,
    'indifferenziato': this.default_amount,
    'vetro': this.default_amount
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sDictionary: DictionaryService) {
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
