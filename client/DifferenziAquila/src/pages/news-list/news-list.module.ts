import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListPage } from './news-list';

@NgModule({
  declarations: [
    NewsListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsListPage),
  ],
  exports: [
    NewsListPage
  ]
})
export class NewsListPageModule {}
