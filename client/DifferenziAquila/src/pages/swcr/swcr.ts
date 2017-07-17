import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, NavParams, AlertController} from 'ionic-angular';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';
import {MessageProvider} from '../../providers/message.provider';

import {SpecialWasteProvider} from "../../providers/sw.provider";
import {SpecialWasteCollectionRequestProvider} from "../../providers/swcr.provider";
import {SpecialWaste} from "../../models/specialWaste.model";
import {SpecialWasteRequest} from "../../models/specialWasteRequest.model";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the SwcrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-swcr',
  templateUrl: 'swcr.html',
})
export class SwcrPage {

  defaultAmount: String = this.sDictionary.get("AMOUNT");
  defaultCategory: String = "CHOOSE_CAT";
  defaultDate: String = this.sDictionary.get("CHOOSE_DAY");
  defaultTime: String = this.sDictionary.get("CHOOSE_TIME_SLOT");

  date: String = this.defaultDate;
  time: String = this.defaultTime;
  amount: any = this.defaultAmount;
  category: String = this.defaultCategory;
  description: String = "";
  idCategory: number=null;

  specialWastes: SpecialWaste[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public sDictionary: DictionaryService,
              public sMessage: MessageProvider,
              public sSpecialWaste: SpecialWasteProvider,
              public sSpecialWasteCollectionRequest: SpecialWasteCollectionRequestProvider,
              public datepipe: DatePipe) {
  }

  ionViewDidLoad() {
    if(this.navParams.get("fromLogin")) {
      this.navCtrl.remove(1);
    }

    this.init();
    console.log('ionViewDidLoad SwcrPage');
  }

  presentDatePicker() {

    let inputs = [];
    let today=new Date();
    //inizio da "domani"
    let day = new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000));

    for (let i = 0; i < 14; i++) {
      let nextDay = new Date(day.getTime() + (i * 24 * 60 * 60 * 1000));
      inputs[i] = [];
      let item = nextDay.getDate() + ' ' + this.sDictionary.get((nextDay.getMonth() + 1).toString()) + ' ' + nextDay.getFullYear();
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = item;
      inputs[i]['value'] = item;

      if (nextDay.getDay() == 0 || nextDay.getDay() == 6) {
        inputs[i]['disabled'] = "true";
      }

    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_DAY"),
      inputs: inputs,
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.date = data;
            }

          }
        }
      ]
    });
    alert.present();
  }

  presentTimePicker() {
    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("CHOOSE_TIME_SLOT"),
      inputs: [
        {
          type: 'radio',
          label: '9 - 11',
          value: '9 - 11'
        },
        {
          type: 'radio',
          label: '11 - 13',
          value: '11 - 13'
        },
        {
          type: 'radio',
          label: '15 - 17',
          value: '15 - 17'
        },
        {
          type: 'radio',
          label: '17 - 19',
          value: '17 - 19'
        }

      ],
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.time = data;
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentAmountPicker() {

    let inputs = [];

    for (let i = 0; i < 10; i++) {
      inputs[i] = [];
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = i + 1;
      inputs[i]['value'] = i + 1;

    }

    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("AMOUNT"),
      inputs: inputs,
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.amount = data;
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentCategoryPicker() {

    let inputs = [];

    let i=0;
    for (let item of this.specialWastes){

      //riempio con valori da database
      inputs[i] = [];
      inputs[i]['type'] = 'radio';
      inputs[i]['label'] = this.sDictionary.get(item.name.toString());
      inputs[i]['value'] = item.name;
      i++;
      }


    let alert = this.alertCtrl.create({
      title: this.sDictionary.get("AMOUNT"),
      inputs: inputs,
      buttons: [
        {
          text: this.sDictionary.get("CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.sDictionary.get("OK"),
          handler: (data) => {
            console.log('Ok clicked');
            if (data) {
              this.category = data;
              this.idCategory=this.getSwId(this.specialWastes, data).id;
            }
          }
        }
      ]
    });
    alert.present();
  }

  getSwId(data, filter){
    let result = data.filter(function(obj){
      return obj.name == filter;
    });
    return result ? result[0] : null;
  }

  clear() {
    this.date = this.defaultDate;
    this.time = this.defaultTime;
    this.category = this.defaultCategory;
    this.amount = this.defaultAmount;
    this.description = "";
  }


  init(){
    const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();
    this.sSpecialWaste.get().then((data: SpecialWaste[])=> {
      this.specialWastes=data;
      loading.dismiss();
    })
      .catch(()=>  {
        loading.dismiss().then(()=>{
          this.sMessage.presentMessage('ko',this.sDictionary.get("NO_CONNECTION"));
          this.navCtrl.push("MenuPage");
        });
      });
  }

  validate():Promise<any>{
    return new Promise((resolve,reject)=>{
      console.log("date: "+this.date+" time: "+this.time+" amount: "+this.amount+" category: "+this.category+" desc: "+this.description);

      if(this.date!==null && this.date!=this.defaultDate &&
        this.time!==null && this.time!="" && this.time!=this.defaultTime &&
        this.amount!==null && this.amount!= this.defaultAmount &&
        this.category!==null && this.category!="" && this.category!=this.defaultCategory &&
        this.description!==null && this.description!=""){
        resolve();

      }else{
        console.log("date: "+this.date+" time: "+this.time+" amount: "+this.amount+" category: "+this.category+" desc: "+this.description);
        console.log("check date: "+(this.date!==null && this.date!=this.defaultDate));
        console.log("check time: "+(this.time!==null && this.time!="" && this.time!=this.defaultTime));
        console.log("check amount: "+(this.amount!==null && this.amount!= this.defaultAmount ));
        console.log("category: "+(this.category!==null && this.category!="" && this.category!=this.defaultCategory));
        console.log("desc: "+(this.description!==null && this.description!=""));

        reject();
      }
    });
  }

  sendRequest(){
    const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
    loading.present();
    this.validate().then(()=>{
      console.log("[SWCR] form is valid");
      console.log("[SWCR] idCategory: "+this.idCategory);
      console.log("[SWCR] date: "+this.date.trim());
      let fixedDate = this.handleDate();
      const request= new SpecialWasteRequest ({
        "date":this.datepipe.transform(fixedDate, "yyyy-MM-dd"),
        "hour":this.time,
        "amount":this.amount,
        "description":this.description});
      console.log("[SWCR] idCategory: "+this.idCategory);
      this.sSpecialWasteCollectionRequest.saveSWRequest(request,this.idCategory).then(()=> {
        loading.dismiss().then(() => {
          this.sMessage.presentMessage('ok', this.sDictionary.get('SUCCESS'));
          this.clear();
          return;
        })
      }).catch(()=>{
        console.log("errore failure send request swcr");
        loading.dismiss().then(()=>{
          this.sMessage.presentMessage('ko',this.sDictionary.get("FAILURE"));
          return;
        });
      });
    }).catch(()=>{
      loading.dismiss().then(()=>{
        this.sMessage.presentMessage('warn',this.sDictionary.get("WARNING_EMPTY_SWCR"));
        return;
      })
    })

  }

  handleDate(){
    console.log("[SWCR] preferred language: "+this.sDictionary.getPreferredLanguage() );
    if(this.sDictionary.getPreferredLanguage() == "it-IT"){
      //caso italiano
      let day = this.date.trim().substr(0, 2);
      let month = this.date.trim().substring(3, this.date.trim().length - 5);
      let year = this.date.trim().slice(-4);

      console.log("[SWCR] month "+month);
      let correctMonth = this.sDictionary.get(month.toUpperCase());
      console.log("[SWCR] computing date: "+year+"-"+correctMonth+"-"+day);
      let out = this.datepipe.transform(year+"-"+correctMonth+"-"+day);
      return out;
    }else{
      return this.date;
    }
  }


}


