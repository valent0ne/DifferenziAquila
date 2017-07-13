import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import {DictionaryModule} from "../../providers/dictionary-service/dictionary-module";

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    DictionaryModule
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarPageModule {}
