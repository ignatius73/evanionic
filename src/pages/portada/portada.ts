import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PortadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portada',
  templateUrl: 'portada.html',
})
export class PortadaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortadaPage');
  }

  nuevoUsuario(){
    this.navCtrl.push( NuevoUsuarioPage );
  }

  login(){
    this.navCtrl.push( LoginPage );
  }

}
