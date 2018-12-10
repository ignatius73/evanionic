import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoHomePage } from './nuevo-home';

@NgModule({
  declarations: [
    NuevoHomePage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoHomePage),
  ],
})
export class NuevoHomePageModule {}
