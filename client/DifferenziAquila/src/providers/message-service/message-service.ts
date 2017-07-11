import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from 'ionic-angular';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessageService {

  constructor(public http: Http,
              public toastCtrl:ToastController
  ) {
    console.log('Hello MessageServiceProvider Provider');
  }

  presentMessage(result, msg){
    let css="";
    switch(result){
      case 'ok':
        css='okMessage';
        break;
      case 'ko':
        css='koMessage';
        break;
      default:
        css='warningMessage';
        break;
    }
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      cssClass: css,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
