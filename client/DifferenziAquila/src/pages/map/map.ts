import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {DictionaryService} from "../../providers/dictionary-service/dictionary-service";
import {CollectionPointProvider} from "../../providers/collectionpoint.provider";
import {CollectionPoint} from "../../models/collectionPoint.model";
import {MessageProvider} from "../../providers/message.provider";
import {isUndefined} from "ionic-angular/util/util";

declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any = null;
  cps: Array<any> = new Array();
  myPosition: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public geolocation: Geolocation,
              public sMessage: MessageProvider,
              public sDictionary: DictionaryService,
              public loadingCtrl: LoadingController,
              public sCp: CollectionPointProvider) {

  }


  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad MapPage');
  }


  loadMap() {
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
    loading.present();

    this.sCp.initialize().then(() => {


      let defaultPosition = {lat: 42.349790, lng: 13.399361};
      let mapOptions = {
        center: defaultPosition,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let cps = this.sCp.getCollectionPoints();
      this.clearMarkers();

      for (let c of cps) {
        let lat: number = Number(c.latitude);
        let lng: number = Number(c.longitude);
        let latLng = {lat: lat, lng: lng};
        let desc = "<b>[" + c.id + "] " + this.sDictionary.get(c.specialwaste.toUpperCase()) + "</b><br>" + c.description;
        console.log("[Map] marker: " + lat + " " + lng + " " + desc + " " + c.specialwaste);
        this.addMarker(latLng, c.id.toString(), desc);
      }

      loading.dismiss();

    }).catch(() => {
      console.log("[Map] catch initialize");
      this.sMessage.presentMessage('ko', this.sDictionary.get("ERROR_MAP"));
      this.navCtrl.push("MenuPage");
      loading.dismiss();
    });
  }

  clearMarkers() {
    for (let item of this.cps) {
      item.setMap(null);
    }
    this.cps = new Array<any>();
  }


  getMyPos(data, filter) {
    let result = data.filter(function (obj) {
      return obj.label == filter;
    });
    return result ? result[0] : null;
  }


  addMarker(latLng, label, infoContent) {

    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      label: label
    });

    this.cps.push(marker);

    let infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
  }

  doRefresh() {

    this.sCp.refresh().then(() => {
      this.sMessage.presentMessage('ok', this.sDictionary.get("REFRESH_OK"));
      this.navCtrl.insert(1, "MapPage");
      this.navCtrl.pop();
    }).catch(() => {
      this.sMessage.presentMessage('ko', this.sDictionary.get("REFRESH_KO"));
    });

  }

  geoLocalize() {
    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING")});
    loading.present();


    let myPos = this.getMyPos(this.cps, "i");
    if (!isUndefined(myPos)) {
      myPos.setMap(null);
    }


    //carica la mappa sulla posizione attuale
    this.geolocation.getCurrentPosition().then((position) => {
      let currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(currentLatLng);
      loading.dismiss();
      this.sMessage.presentMessage('ok', this.sDictionary.get("YOU_ARE_HERE"));
      this.addMarker(currentLatLng, "i", this.sDictionary.get("YOU_ARE_HERE"));
    }).catch((err) => {
      console.log("[Map] catch geolocalize: " + err.toString());
      this.sMessage.presentMessage('warn', this.sDictionary.get("GEO_ERROR"));
      loading.dismiss();
    });
  }

}
