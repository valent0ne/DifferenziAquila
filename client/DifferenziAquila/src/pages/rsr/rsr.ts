import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import  {MessageProvider} from '../../providers/message.provider';
import {RecyclingSackProvider} from '../../providers/rs.provider';
import {RecyclingSackRequestProvider} from '../../providers/rsr.provider';
import {RecyclingSack} from "../../models/recyclingSack.model";
import {RecyclingSackRequest} from "../../models/recyclingSackRequest.model";
import {SACK} from "../../constants";



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


  recyclingSacks: RecyclingSack[];
  rsrs: Map<number,RecyclingSackRequest> = new Map();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public sMessage: MessageProvider,
              public sDictionary: DictionaryService,
              public sRs: RecyclingSackProvider,
              public sRsr: RecyclingSackRequestProvider) {


  }


  ionViewDidLoad() {
    if(this.navParams.get("fromLogin")) {
      this.navCtrl.remove(1);


    }
    this.init();
    console.log('ionViewDidLoad RsrPage');

  }

  init(){
    const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();
    this.sRs.get().then((data: RecyclingSack[])=> {
      this.recyclingSacks=data;
      for(let item of this.recyclingSacks){
        this.rsrs.set(item.id,new RecyclingSackRequest({"amount":SACK.DEFAULT, "date": new Date()}));
      }

      loading.dismiss();
    })
      .catch(()=>  {
        loading.dismiss().then(()=>{
          this.sMessage.presentMessage('ko',this.sDictionary.get("NO_CONNECTION"));
          this.navCtrl.push("MenuPage");
        });
      });
  }

  changeAmount(action:string, id:number){
    switch (action){
      case "-":
        if(this.rsrs.get(id).amount>0){
          this.rsrs.get(id).amount--;
        }
        break;
      case "+":
        if(this.rsrs.get(id).amount<SACK.LIMIT){
          this.rsrs.get(id).amount++;
        }
        break;
      default:
        break;
    }

  }

  clear(){
    this.rsrs.forEach((item)=>{
      item.amount=SACK.DEFAULT;
      });
  }

  sendRequest(){
    let count=0;
    const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();

    //conto le richieste da effettuare
    this.rsrs.forEach((item)=>{
      if(item.amount>0)
        count++;
    });

    //se non ne ho nessura warning perchè gli amount sono tutti 0
    if(count==0){
      loading.dismiss().then(()=>{
        this.sMessage.presentMessage("warn",this.sDictionary.get("ITEMS_EMPTY"));
        return;
      })
    }

    //scorro le richiese da effettuare
    for(let item of this.recyclingSacks){
      //se l'amount di questa richiesta è minore di 1 la salto
      if ((this.rsrs.get(item.id).amount) < 1){
        continue;
      }
      //invio la richiesta, per ogni invio con successo decremento il numero di richieste da effettuare
      this.sRsr.saveRSRequest(this.rsrs.get(item.id), item.id).then(()=>{
        count--;
        //se count==0 significa che le richieste sono state inoltrate tutte con successo
        if(count==0){
          loading.dismiss().then(()=>{
            this.sMessage.presentMessage('ok',this.sDictionary.get('SUCCESS'));
            return;
          });
        }//in caso di errore su una richiesta faccio comparire il popup ed esco
      }).catch(()=>{
        loading.dismiss().then(()=>{
          this.sMessage.presentMessage('ko',this.sDictionary.get("FAILURE"));
          return;
        });
      });
    }
  }


}
