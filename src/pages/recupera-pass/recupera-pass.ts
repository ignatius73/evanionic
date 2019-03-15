import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the RecuperaPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recupera-pass',
  templateUrl: 'recupera-pass.html',
})
export class RecuperaPassPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private usuarios: UsuarioProvider) {
                console.log("Este es navParams en RecuperaPass");
                console.log( this.navParams.data );
                this.usuarios.recuperarPass( this.navParams.data.user );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperaPassPage');
  }

  close(){
    
    let data = {
          mensaje: "fallo"
      }
      this.viewCtrl.dismiss({
          data:data
      });
  }

}
