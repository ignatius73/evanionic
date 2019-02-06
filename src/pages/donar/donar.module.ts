import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonarPage } from './donar';

@NgModule({
  declarations: [
    DonarPage,
  ],
  imports: [
    IonicPageModule.forChild(DonarPage),
  ],
})
export class DonarPageModule {}
