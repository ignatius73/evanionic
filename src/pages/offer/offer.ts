import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';
import { Works } from '../../interfaces/work.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CobraServicioPage } from '../cobraservicio/cobraservicio';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';
import { URL_SERVICIOS } from '../../config/url.servicios';





/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {
  worke: Works = {};
  hab: Works[] = [];
  objeto: any; 
  valor: any;
  catsel: boolean = false;
  ruta: any = URL_SERVICIOS;
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public offer: OfferedProvider,
              private loading: LoadingController,
              private usuarios: UsuarioProvider,
              private modal: ModalController
              
 ) {
     
  console.log("Voy a imprimir el navParams.data.user");
      console.log(navParams.data.user);
      console.log('Constructor OfferPage');

      //Chequeo si el usuario pagó
      
        
    //  console.log( this.hab.length );

      
  }

  ionViewDidLoad() {
    this.offer.cargar_categorias();
    if ( typeof this.navParams.data.user !== undefined){
      this.user = this.navParams.data.user;
    }else{
      this.user = this.usuarios.us[0];
    }
    
    console.log( this.user );
      console.log( "Voy a chequear si pagó");
      /*Descomentar para Cobrar en Producción
     */
      this.usuarios.pago( this.user )
        .then( ( resp =>{
          console.log("Tiene que cobrar o no?");
          console.log ( resp );
          if  ( resp['pago'] === false ){
            let modal = this.modal.create( CobraServicioPage, { user: this.user } );
            modal.present();
             modal.onDidDismiss( (data) =>{
               console.log("Voy a imprimir la data que me devuelve el cobra servicio");
               console.log(data);
               if ( typeof data === "undefined" ){

                console.log( this.user );
                console.log("No fue posible suscribirlo a Cinc");
                this.navCtrl.setRoot( CentralMensajesPage, { user: this.user });
               }
                if( data['data']['mensaje'] === "exito" ){
                    
                    console.log(data['data']['mensaje']);
                 // this.ionViewDidLoad();
                }else{
                  console.log( this.user );
                  this.navCtrl.setRoot(CentralMensajesPage, { user: this.user } );
                  console.log("No fue posible suscribirlo a Cinc");
                }
             } );
          }else{

          }
        }))
    
 /* */


  }

  sig_pag( ev ){

    this.offer.cargar_todos_get()
      .then( () => {
        ev.complete();
      })
  }

  categPicked( i ){
    this.catsel = true;
    this.offer.cargar_todas_skills( i.id )
    console.log( i.id );

  }

  picked( i ) {
    console.log(i);
    this.worke.idWork = i.id;
    this.worke.description = i.nombre;
    
     for ( let w of this.hab ) {
        if ( w.idWork == this.worke.idWork ){
         return;
       }
    }

    this.hab.push( this.worke)
    this.worke = {};
    
    }

  cargaSkills() {
   console.log("Entro a cargaSkills");
    let email = this.navParams.data.user['email'];
    this.objeto = { 'email': email,
                  'hab' : this.hab };

      
    this.offer.agrega_skills_user( email, this.hab )
      .then( () => {});
    this.hab = [];
    this.navCtrl.push( NuevoHomePage, { user: this.navParams.data.user });
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

borralo( o ){
  console.log(o);
}
}
