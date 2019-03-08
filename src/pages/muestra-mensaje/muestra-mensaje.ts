import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Msg } from '../../interfaces/msg.interface';

/**
 * Generated class for the MuestraMensajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-muestra-mensaje',
  templateUrl: 'muestra-mensaje.html',
})
export class MuestraMensajePage {
  msg: Msg;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController) {
                console.log(this.navParams);
               if( this.navParams.data.msg ) {
                 this.msg = this.navParams.data.msg;
                 console.log(this.msg);
               } else {
                this.viewCtrl.dismiss({                 
              });
               }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuestraMensajePage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
