import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, InfiniteScrollContent, LoadingController, ModalController } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';
import { Works } from '../../interfaces/work.interface';
import { Braintree } from '@ionic-native/braintree';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CobraServicioPage } from '../cobraservicio/cobraservicio';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';



/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  worke: Works = {};
  hab: Works[] = [];
  objeto: any; 
  valor: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public offer: OfferedProvider,
              private loading: LoadingController,
              private brain: Braintree,
              private usuarios: UsuarioProvider,
              private modal: ModalController ) {
    //  console.log(navParams.data.user);
      console.log('Constructor OfferPage');

      //Chequeo si el usuario pagó
      
        
    //  console.log( this.hab.length );

      
  }

  ionViewDidLoad() {
    this.offer.cargar_todos();
    let user = this.navParams.data.user;
    console.log( user );
      console.log( "Voy a chequear si pagó");
      this.usuarios.pago( user )
        .then( ( resp =>{
          console.log ( resp );
          if  ( resp[0]['pago'] === '0' ){
            let modal = this.modal.create( CobraServicioPage, { user } );
            modal.present();
             modal.onDidDismiss( (data) =>{
               console.log(data);
                if( data['mensaje'] === "exito" ){
                    
                    console.log(data['mensaje']);
                 // this.ionViewDidLoad();
                }else{
                  console.log( user );
                  this.navCtrl.push(CentralMensajesPage, { user: user } );
                  console.log("No fue posible suscribirlo a Cinc");
                }
             } );
          }
        }))
    
    console.log('ionViewDidLoad OfferPage');
    console.log( this.offer.skills);
 /*   let user = this.navParams.data.user;
    console.log( user );
    this.usuarios.pago( user )
      .then( ( resp =>{
        if  ( resp === false ){
          let modal = this.modal.create( CobraServicioPage, { user } );
          modal.present();
            
        }
      }))*/


  }

  sig_pag( ev ){

    this.offer.cargar_todos()
      .then( () => {
        ev.complete();
      })
  }

  picked( i ) {
    console.log( i.idWork );
    this.worke.idWork = i.idWork;
    this.worke.description = i.description;
    
     for ( let w of this.hab ) {
        if ( w.idWork == this.worke.idWork ){
         return;
       }
    }

    this.hab.push( this.worke)
    this.worke = {};
    
    }

  cargaSkills() {
    let email = this.navParams.data['email'];
    this.objeto = { 'email': email,
                  'hab' : this.hab };

      
    this.offer.agrega_skills_user( email, this.hab )
      .then( () => {});
    this.hab = [];
    this.navCtrl.pop();
  }

  filtraWork( ev: any ) {
    console.log( ev );
    this.valor = null;
    if (ev.target.value !== "" && ev.target.value.length >= 2){
      this.valor = ev.target.value;
    
   
    
    let loader = this.loading.create({
      content: "Please wait...",
      duration: 3000
  })  ;
  loader.present().then( () => {
    this.offer.cargar_todas_skills( this.valor )
        .then( ( resp ) => {
          loader.dismiss();
          console.log( resp );
        });
   
    });

    }else{
      console.log("sale por acá");
    }
}
}
