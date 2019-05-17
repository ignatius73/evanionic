import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoWorkPage } from './nuevo-work';

@NgModule({
  declarations: [
    NuevoWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoWorkPage),
  ],
})
export class NuevoWorkPageModule {}
