import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListPage } from './news-list';
import { DictionaryModule } from '../../providers/dictionary-service/dictionary-module';



@NgModule({
  declarations: [
    NewsListPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(NewsListPage),
  ],
  exports: [
    NewsListPage
  ]
})
export class NewsListPageModule {}
