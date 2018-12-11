import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, InfiniteScrollContent } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';
import { Works } from '../../interfaces/work.interface';



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
              public offer: OfferedProvider) {
      console.log(navParams);

      this.offer.cargar_todos();

      console.log( this.hab.length );

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
    console.log( this.offer.skills);
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

    
    this.valor = null;
    this.valor = ev.target.value;
    console.log( this.valor );
    this.offer.cargar_todos( this.valor )
        .then( ( resp ) => {
          console.log( resp );
        })
   
  }


}
