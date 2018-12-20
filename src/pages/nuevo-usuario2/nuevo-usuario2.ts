import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { Chapel } from '../../interfaces/chapel.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuarios: UsuarioProvider ) {
    this.user = navParams.data.user;
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
  this.chapel.nameChapel = v.name_church;
  this.chapel.idChapel = v.idChurch;
  this.chapel.city = v.city;
  this.chapel.address = v.address_church;
  this.chapel.zipcode = v.zipcode;
  this.chapel.pastor = v.pastor;
  this.chapel.state = v.state;
  this.chapels = [];
  
}

}
