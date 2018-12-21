import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CentralMensajesPage } from './central-mensajes';

@NgModule({
  declarations: [
    CentralMensajesPage,
  ],
  imports: [
    IonicPageModule.forChild(CentralMensajesPage),
  ],
})
export class CentralMensajesPageModule {}
