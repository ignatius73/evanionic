import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { OfferPage } from '../offer/offer';
import { DonarPage } from '../donar/donar';
import { PortadaPage } from '../portada/portada';
import { OneSignal } from '@ionic-native/onesignal';
import { PushnotProvider } from '../../providers/pushnot/pushnot';
import { MyApp } from '../../app/app.component';
import { MuestraMensajePage } from '../muestra-mensaje/muestra-mensaje';



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
              private usuarios: UsuarioProvider,
              public pushnot: PushnotProvider,
              private platform: Platform,
              private modal: ModalController
              
              
              ) {
                console.log("Usuario en el CentralMensajes");
                console.log( this.usuarios.us );
                if(this.usuarios.us.length === 0){
                  this.navCtrl.setRoot(PortadaPage);
                }
                
                if ( this.platform.is('cordova')){
                  this.pushnot.generoTags( this.usuarios.us );
                }
                
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
    let modal = this.modal.create( MuestraMensajePage, { msg: obj } );
            modal.present();
             modal.onDidDismiss( () =>{
               
               
               });
  }

  donar(){
    this.navCtrl.push( DonarPage, { user: this.navParams.data.user})
  }

  anunciar(){
    console.log( this.navParams );
    console.log( this.navParams.data.user );
    this.navCtrl.setRoot( OfferPage, { user: this.navParams.data.user, back: this.navCtrl.getActive() } );
  }

  

}
