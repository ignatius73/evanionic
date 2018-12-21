import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { Chapel } from '../../interfaces/chapel.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';


/**
 * Generated class for the NuevoUsuario2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-usuario2',
  templateUrl: 'nuevo-usuario2.html',
})
export class NuevoUsuario2Page {
  user: User = {};
  chapel: Chapel = {};
  chapels: any[] = [];
  pastor: boolean = false;
  comunidad: boolean = false;
  desactivo: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuarios: UsuarioProvider ) {
    this.user = navParams.data.user;
    console.log( this.user );
    console.log( navParams.data.editar);
  }

  ionViewDidLoad() {
    //Obtengo todas las iglesias.
    
    console.log('ionViewDidLoad NuevoUsuario2Page');
  }

  filtraComunidad( evt ){
    this.chapels = [];
    this.usuarios.searchChapel(evt.value)
      .then( data => {
       this.chapels = this.usuarios.chapel;
      

        console.log( this.chapels );
      });

}

cargaDatosChapel( v ){
  this.desactivo = true;
  this.chapel.name_church = v.name_church;
  this.chapel.idChurch = v.idChurch;
  this.chapel.city = v.city;
  this.chapel.address_church = v.address_church;
  this.chapel.zip = v.zipcode;
  this.chapel.pastor = v.pastor;
  this.chapel.state = v.state;
  this.chapels = [];
  
}

crearUsuario() {

 if ( this.comunidad === true ){ 
   console.log( "Voy a crear la Comunidad" );
  //Cargo la nueva Comunidad
   console.log( this.chapel );

   if ( this.pastor === true ){
     this.user.role = 1;
     this.chapel.pastor = this.user.name + " " + this.user.surname;

   }
  
 this.usuarios.creaChapel( this.chapel ).then( (resp:any) =>{
   console.log( resp );
    if (resp) {

      console.log ( resp['query'] );
      //this.navCtrl.push( NuevoHomePage, { user: this.user} );
    } 
 });
   
}
//Finalmente, cargo el nuevo usuario
this.usuarios.nuevoUsuario( this.user ).then( (resp:any) =>{
  console.log( resp['existe'] );

  if (resp['token']) {
    console.log( "Estoy intentando cargar el usuario" );
    this.navCtrl.push( CentralMensajesPage, { user: this.user } );
  } 
});
 
}

}
