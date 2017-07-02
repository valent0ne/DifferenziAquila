import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';


@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(SettingsPage),
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
