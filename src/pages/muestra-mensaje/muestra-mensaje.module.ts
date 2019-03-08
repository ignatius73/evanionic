import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuestraMensajePage } from './muestra-mensaje';

@NgModule({
  declarations: [
    MuestraMensajePage,
  ],
  imports: [
    IonicPageModule.forChild(MuestraMensajePage),
  ],
})
export class MuestraMensajePageModule {}
