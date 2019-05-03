import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Navbar } from 'ionic-angular';
import { OauthProvider } from '../../providers/oauth/oauth';
//Interface
import { User } from '../../interfaces/user.interface';
import { Msg } from '../../interfaces/msg.interface';


//Providers
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

//Pages
import { LoginPage } from '../login/login';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';
import { OfferPage } from '../offer/offer';
import { SearchWorkerPage } from '../search-worker/search-worker';
import { MensajesPage } from '../mensajes/mensajes';
import { PortadaPage } from '../portada/portada';


@IonicPage()
@Component({
  selector: 'page-nuevo-home',
  templateUrl: 'nuevo-home.html',
})
export class NuevoHomePage {
@ViewChild(Navbar) navBar: Navbar;
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
               public modalCtrl: ModalController,
               private navParams: NavParams
               ) {
                 
   console.log(navParams);

  if ( this._us.us ) {
    console.log ( "Existe navParams");
  /*  this.fb = true;
    this.userLogged =  _oa.usuario;
    this.anFAuth.authState.subscribe( res => {
      if (!res) {
        //Descomentar linea para producción
        this.navCtrl.setRoot(LoginPage);
      } 
    })
   
  }else{
   */  
    this.userLogged =  this._us.user;
 
  } else {
   // this.navCtrl.setRoot(LoginPage);
  }
  

}

ionViewDidLoad() {
  this.navBar.backButtonClick = (e:UIEvent)=>{
    this.navCtrl.setRoot( this.navParams.data.back.component, { user: this.navParams.data.user, back: this.navCtrl.getActive() });
   
 }
  console.log(this._us.us);
  this.role = this._us.us[0].role;
  if (this._us.us[0].imagen == ""){
    
      this.fb = true;
    }
  //this.cargaUsuario();
}

cargaUsuario(){
  
  console.log( this.userLogged );
  this._us.getUser( this.userLogged ).then( resp => {
    console.log( "Voy a mostrar la respuesta de GetUser")
    console.log ( resp );
    if ( this._us.existe === false ){
        this.navCtrl.setRoot( NuevoUsuarioPage );

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
  this.navCtrl.setRoot( SearchWorkerPage,  {user: this._us.us[0], back: this.navCtrl.getActive() }  );
}

offer(){
  console.log("Voy a imprimir el user");
  console.log(this._us.us[0]);
  this.navCtrl.setRoot( OfferPage,  {user: this._us.us[0], back: this.navCtrl.getActive() } );
  
}

crearMensajes(){
  this.navCtrl.push( MensajesPage, {user: this._us.us });
}




mensajesPastor(){
 this.navCtrl.push( MensajesPage, { user: this._us.us[0].church });

}

editar(){
  console.log(this._us.us[0]);
  this.navCtrl.push( NuevoUsuarioPage, { user: this._us.us[0]});
}

}

