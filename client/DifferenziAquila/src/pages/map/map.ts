import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

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
  map: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public geolocation: Geolocation,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }


  loadMap() {

    var defaultPosition = {lat: 42.349790, lng: 13.399361};
    let mapOptions = {
      center: defaultPosition,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    //qui for per aggiunta marker sulla mappa
    var latLng = {lat: 42.349790, lng: 13.399361};
    this.addMarker(latLng, 'A', 'descrizione descrizione descrizione descrizione descrizione ');


  }


  addMarker(latLng, label, infoContent) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      label: label
    });

    var infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
  }

  geoLocalize() {
    //carica la mappa sulla posizione attuale
    this.geolocation.getCurrentPosition().then((position) => {
      let currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(currentLatLng);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'errore: controlla di avere la geolocalizzazione attiva',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}
