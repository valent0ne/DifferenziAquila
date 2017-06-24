import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RsrPage } from './rsr';

@NgModule({
  declarations: [
    RsrPage,
  ],
  imports: [
    IonicPageModule.forChild(RsrPage),
  ],
  exports: [
    RsrPage
  ]
})
export class RsrPageModule {}
