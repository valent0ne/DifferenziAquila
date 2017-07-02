import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RsrPage } from './rsr';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';


@NgModule({
  declarations: [
    RsrPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(RsrPage),
  ],
  exports: [
    RsrPage
  ]
})
export class RsrPageModule {}
