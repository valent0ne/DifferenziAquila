import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(MenuPage),
  ],
  exports: [
    MenuPage
  ]
})
export class MenuPageModule {}
