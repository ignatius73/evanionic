import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchChapelPage } from './search-chapel';

@NgModule({
  declarations: [
    SearchChapelPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchChapelPage),
  ],
})
export class SearchChapelPageModule {}
