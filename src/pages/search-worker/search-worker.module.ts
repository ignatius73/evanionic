import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWorkerPage } from './search-worker';

@NgModule({
  declarations: [
    SearchWorkerPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWorkerPage),
  ],
})
export class SearchWorkerPageModule {}
