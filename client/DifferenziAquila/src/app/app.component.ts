import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {SplashPage} from "../pages/splash/splash";
import {DictionaryService} from "../providers/dictionary-service/dictionary-service";

@Component({
  templateUrl: 'app.html',
  providers: [DictionaryService]
})
export class MyApp {
  rootPage:any = 'SplashPage';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              sDictionary: DictionaryService) {
    platform.ready().then(() => {
      let promises = [] as Promise<any>[];
      promises.push(sDictionary.load());


      Promise.all(promises).then(() => {

      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.hide();
    });
  }
}

