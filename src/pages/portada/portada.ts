import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';


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
  ready: Boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuario: UsuarioProvider) {
                
               
              } 
              
  ionViewWillEnter(){
    console.log("POrtadaPageIonViewWillEnter");
    this.usuario.cargar_storage()
    .then( ( data ) => {
      console.log("La data que devuelve storage");  
              console.log(data); 
              console.log("Length de data storage");
              console.log(Object.keys(data).length); 
      if ( Object.keys(data).length !== 0 && (data['token'] !== "undefined" || data['idUsuario'] !== "undefined")){
        this.usuario.getUserId(data)
        .then( () =>{
          console.log("Voy a imprimir el usuario");
          console.log( this.usuario.us[0]);
          this.navCtrl.setRoot(CentralMensajesPage, { user: this.usuario.us[0]});
        })
      
      } else {
        this.ready = true;
      }
    })
    .catch( ( err ) => {
      console.log( "Error " + err)
    }) 

  }
            
  ionViewDidLoad() {

    
    
  }

  nuevoUsuario(){
    this.navCtrl.push( NuevoUsuarioPage );
  }

  login(){
    this.navCtrl.push( LoginPage );
   
    
  }

}
