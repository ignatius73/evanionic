import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { PortadaPage } from '../portada/portada';

/**
 * Generated class for the CerrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerrar',
  templateUrl: 'cerrar.html',
})
export class CerrarPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuario:UsuarioProvider
              ) {
                console.log("Voy a entrar a cerrar");
  }

  ionViewWillEnter()  {
    console.log("Voy a imprimir el tamaño del usuario");
    console.log(this.usuario.us.length);
    if ( this.usuario.us.length > 0 ){
      this.usuario.cerrarSesion()
        .then( () =>{
            console.log("Resuelve por el resolve");
            console.log("Voy a imprimir el tamaño del usuario");
            console.log(this.usuario.us.length);
            this.navCtrl.setRoot(PortadaPage);
        })
        .catch( ( err ) => {
          console.log("ocurrió un error en la promesa de Cerrar Sesión " + err);
        })
        
    }
  }

}
