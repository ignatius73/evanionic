import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { OauthProvider } from '../../providers/oauth/oauth';
//Interface
import { User } from '../../interfaces/user.interface';
import { Msg } from '../../interfaces/msg.interface';


//Providers
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersProvider } from '../../providers/users/users';
//Pages
import { LoginPage } from '../login/login';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';
import { OfferPage } from '../offer/offer';
import { SearchWorkerPage } from '../search-worker/search-worker';
import { MensajesPage } from '../mensajes/mensajes';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Facebook } from '@ionic-native/facebook';
import { PortadaPage } from '../portada/portada';


@IonicPage()
@Component({
  selector: 'page-nuevo-home',
  templateUrl: 'nuevo-home.html',
})
export class NuevoHomePage {
 email: string;
 userLogged: User = {};
 prueba: any[] = [];
 datos: any;
 role: number = 0;
 mensaje: Msg = {};
 imgpreview: string = "";
 img64: any;
 fb: boolean = false;
 

   constructor( private _oa: OauthProvider,
               public _us: UsuarioProvider,
               public navCtrl: NavController,
               private anFAuth: AngularFireAuth,
               private db: AngularFireDatabase,
               public users: UsersProvider,
               public modalCtrl: ModalController,
               private navParams: NavParams,
               private picker: ImagePicker,
               private app: App) {
  console.log( "navParams en nuevoHome " );
  console.log ( navParams.data.user );
  if ( navParams.data.user.photoURL ) {
    console.log ( "Existe navParams");
    this.fb = true;
    this.userLogged =  _oa.usuario;
    this.anFAuth.authState.subscribe( res => {
      if (!res) {
        //Descomentar linea para producción
        this.navCtrl.setRoot(LoginPage);
      } 
    })
   
  }else{
 
    this.userLogged =  navParams.data.user;
 
  }
  

}

ionViewDidLoad() {
  this.cargaUsuario();
}

cargaUsuario(){
  
  console.log( this.userLogged );
  this._us.getUser( this.userLogged ).then( resp => {
    console.log( "Voy a mostrar la respuesta de GetUser")
    console.log ( resp );
    if ( this._us.existe === false ){
        this.navCtrl.push( NuevoUsuarioPage );

    } else {
      if (this._us.us[0].imagen == ""){
        if (this.navParams.data.user.imagen !== ''){
          this.fb = true;
        }
      }
      this.role = this._us.us[0].role;
      
    } 
  });
}


 
ionViewWillEnter(){
  //console.log( this.userLogged );
  
 // this.cargaUsuario();

  
}  
   


signOut() {
this._oa.usuario = {};
this._us.us = [];
this.userLogged = {};
if ( this.fb == true ){
this.anFAuth.auth.signOut().then( ( res => {
  console.log( "SAlgo por que fb es true");
  
  this.navCtrl.setRoot( PortadaPage );

}));
}else {
this.navCtrl.setRoot( PortadaPage );
}



}

mostrar_modal(){

let modal = this.modalCtrl.create( NuevoUsuarioPage );
modal.onDidDismiss( data => {
this.datos = data;
})
modal.present();
}

search(){
  this.navCtrl.push( SearchWorkerPage,  this.userLogged  );
}

offer(){
  this.navCtrl.push( OfferPage,  this.userLogged  );
  
}

crearMensajes(){
  this.navCtrl.push( MensajesPage, {user: this._us.us });
}




mensajesPastor(){
 this.navCtrl.push( MensajesPage, { user: this._us.us[0].church });

}

editar(){
  this.navCtrl.push( NuevoUsuarioPage, { user: this._us.us[0]});
}

}

