import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';


@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(MapPage),
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
