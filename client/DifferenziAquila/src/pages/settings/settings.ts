import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  hh: any ='hh';
  mm: any = 'mm';
  selectedHH: boolean = false;
  selectedMM: boolean = false;
  isToggled: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {

    this.isToggled=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  presentHourPicker(){

    if(!this.isToggled){
      return;
    }

      let inputs = [];

      for (let i = 0; i < 7; i++) {
        inputs[i] = new Array();

        inputs[i]['type'] = "radio";
        inputs[i]['value'] = i+18;
        inputs[i]['label'] = i+18;
      }

      let alert = this.alertCtrl.create({
        inputs: inputs,
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: (data) => {
              console.log('Ok clicked');
              this.hh=data;
              this.selectedHH=true;
            }
          }
        ]
      });
      alert.present();
  }

  presentMinutePicker(){

    if(!this.isToggled){
      return;
    }



    let inputs = [];

    for (let i = 0; i < 4; i++) {
      inputs[i] = new Array();

      inputs[i]['type'] = 'radio';
      inputs[i]['value'] = i*15;
      inputs[i]['label'] = i*15;
    }

    let alert = this.alertCtrl.create({
      inputs: inputs,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Ok clicked');
            this.mm=data;
            this.selectedMM=true;
          }
        }
      ]
    });
    alert.present();
  }


  toggleNotifications(){
      if(!this.isToggled){
        this.selectedMM=false;
        this.selectedHH=false;
        this.mm='mm';
        this.hh='hh';
      }
  }

}
