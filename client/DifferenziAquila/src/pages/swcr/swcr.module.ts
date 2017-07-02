import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwcrPage } from './swcr';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';



@NgModule({
  declarations: [
    SwcrPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(SwcrPage),
  ],
  exports: [
    SwcrPage
  ]
})
export class SwcrPageModule {}
