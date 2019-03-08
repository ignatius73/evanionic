import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { Chapel } from '../../interfaces/chapel.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  myForm: FormGroup;
  editar: boolean = false;
  comu: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuarios: UsuarioProvider,
              public fb: FormBuilder ) {
    this.user = navParams.data.user;
    if ( this.navParams.data.editar === true ){
      this.editar = true;
      ///Obtengo los datos de la Iglesia
      console.log("Teno el idChurch?");
      console.log(this.user);
      let evt = {
        value: {
          'idChurch' : this.user.church
        }
      }

      this.cargoChapel( evt );

      
      }
      
    
    this.myForm = this.fb.group({
      name: [this.chapel.name_church, [Validators.required]],
      address: [ this.chapel.address_church, [Validators.required]],
      city: [this.chapel.city, [Validators.required]],
      state: [ this.chapel.state, [Validators.required]],
      namePastor: [ this.chapel.pastor, [Validators.required]],
      pastor: [ this.pastor, [Validators.required]],
      newComu: [ this.comunidad, [Validators.required]]
    })
  }

  ionViewDidLoad() {
    

  }
  cargoChapel( evt ){
       
    this.chapels = [];
    this.usuarios.searchChapel( evt.value )
      .then( data => {
       this.chapel = this.usuarios.chapel[0];
       this.desactivo = true;

        console.log( this.chapels );
      });

}

  filtraComunidad( ev ){
    let evt = {
      value: {
        'name_church': ev.value
      }
    }
    this.chapels = [];
    this.usuarios.searchChapel( evt.value )
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

  ///Nueva Comunidad?
  if ( this.comunidad === true ){ 
    if ( this.pastor === true ){
      this.user.role = 1;
      this.chapel.pastor = this.user.name + " " + this.user.surname;
    }

 this.usuarios.creaChapel( this.chapel ).then( (resp:any) =>{
   console.log( resp );
    if (resp) {
        this.user.church = resp['id'];
    } 
 });
   
}else{
  console.log(this.chapel.idChurch);
  this.user.church = this.chapel.idChurch
  this.usuarios.editaChapel( this.chapel )
    .then( ( data ) => {
      console.log(data);
      this.navCtrl.setRoot( CentralMensajesPage, { user: this.user } );
    })
    .catch( ( err ) =>{
      console.log("Ocurrió el error " + err);
    })
}

if ( this.editar === true ){
  this.usuarios.editarUsuario( this.user )
    .then( ( data ) =>{
      console.log(data);
      this.navCtrl.setRoot( CentralMensajesPage, { user: this.user } );
    })
    .catch( ( err ) => {
      console.log("Ocurrió el error " + err);
    })
}else{
//Finalmente, cargo el nuevo usuario
this.usuarios.nuevoUsuario( this.user )
  .then( (resp:any) =>{
    console.log( resp['existe'] );
    if (resp['token']) {
    console.log( "Estoy intentando cargar el usuario" );
    this.navCtrl.setRoot( CentralMensajesPage, { user: this.user } );
  } 
});

}



}

}
