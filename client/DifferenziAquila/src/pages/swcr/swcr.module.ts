import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwcrPage } from './swcr';


@NgModule({
  declarations: [
    SwcrPage,
  ],
  imports: [
    IonicPageModule.forChild(SwcrPage),
  ],
  exports: [
    SwcrPage
  ]
})
export class SwcrPageModule {}
