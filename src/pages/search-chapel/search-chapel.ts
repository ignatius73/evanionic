import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Chapel } from '../../interfaces/chapel.interface';


/**
 * Generated class for the SearchChapelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-chapel',
  templateUrl: 'search-chapel.html',
})
export class SearchChapelPage {
  zipCode: string = "";
  iglesia: Chapel = {};


  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public chapel: UsuarioProvider
              ) {

    console.log( navParams.data );
    if ( this.navParams.data.data !== undefined ){

      this.zipCode = this.navParams.data.data;
    console.log( this.zipCode );
  } 
    

  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SearchChapelPage');
  }

  search(  ){
    
    this.chapel.searchChapel( "" )
      .then( ( ) => {

       
          
      });
}

picked( elegido){
  console.log ( elegido );
  console.log ( elegido.idChurch );
  this.iglesia.idChurch = elegido.idChurch;
  this.iglesia.name_church = elegido.name_church;
  
  this.cerrarModal();

 
}

cerrarModal() {
 
  this.viewCtrl.dismiss( this.iglesia );
}

}
