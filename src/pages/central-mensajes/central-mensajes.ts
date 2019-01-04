import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { OfferPage } from '../offer/offer';

/**
 * Generated class for the CentralMensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-central-mensajes',
  templateUrl: 'central-mensajes.html',
})
export class CentralMensajesPage {
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mensajes: UsuarioProvider
              
              ) {
  }

  ionViewDidLoad() {
    this.mensajes.cargarMensajes(0)
      .then( resp =>{

        console.log( resp );
      })
    console.log('ionViewDidLoad CentralMensajesPage');
  }

  anunciar(){
    console.log( this.navParams.data.user );
    this.navCtrl.push( OfferPage, { user: this.navParams.data.user} );
  }

}
