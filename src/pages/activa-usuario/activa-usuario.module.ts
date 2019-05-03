import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivaUsuarioPage } from './activa-usuario';

@NgModule({
  declarations: [
    ActivaUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivaUsuarioPage),
  ],
})
export class ActivaUsuarioPageModule {}
