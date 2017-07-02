import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AlertController, IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import {MyApp} from './app.component';
import {DictionaryModule} from '../providers/dictionary-service/dictionary-module';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '678110e5'
  }
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
    DictionaryModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__differenziaquila',
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertController
  ]
})
export class AppModule {
}
