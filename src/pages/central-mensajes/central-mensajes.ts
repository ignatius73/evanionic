import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { OfferPage } from '../offer/offer';
import { DonarPage } from '../donar/donar';
import { PortadaPage } from '../portada/portada';



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
              public mensajes: UsuarioProvider,
              private MenuCtrl: MenuController,
              private usuarios: UsuarioProvider
              
              ) {
                if(this.usuarios.us.length === 0){
                  this.navCtrl.setRoot(PortadaPage);
                }
                console.log(this.navCtrl);
                
                
  }

  ionViewDidLoad() {
   // this.navCtrl.setRoot(CentralMensajesPage);
    this.mensajes.cargarMensajes(0)
      .then( resp =>{

        console.log( resp );
      })
    console.log('ionViewDidLoad CentralMensajesPage');
  }

  leerMas( obj ){
    console.log(obj);
  }

  donar(){
    this.navCtrl.push( DonarPage, { user: this.navParams.data.user})
  }

  anunciar(){
    console.log( this.navParams );
    console.log( this.navParams.data.user );
    this.navCtrl.push( OfferPage, { user: this.navParams.data.user} );
  }

  

}
