import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { User } from '../../interfaces/user.interface';

declare var Stripe;

/**
 * Generated class for the CobraservicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cobraservicio',
  templateUrl: 'cobraservicio.html',
})
export class CobraServicioPage {

stripe = Stripe('pk_test_DF1o1fSjVXokHlz4p2lWqdz9');
card: any;
source: any;
token: any;
cardholder: any;
billing: any;



user: User = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuario: UsuarioProvider,
              public viewCtrl: ViewController) {
    console.log( navParams.data.user);
    this.user = navParams.data.user;
              }

  
    ionViewDidLoad() {
      this.setupStripe();
    }


    setupStripe(){
      let elements = this.stripe.elements();
      var style = {
        base: {
          color: '#32325d',
          lineHeight: '24px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };
  
      this.card = elements.create('card', { style: style });
  
      this.card.mount('#card-element');
  
      this.card.addEventListener('change', event => {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
  
      var form = document.getElementById('payment-form');
      form.addEventListener('submit', event => {
        event.preventDefault();
  
        // this.stripe.createToken(this.card)
        this.stripe.createToken(this.card).then(result => {
          if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            this.token = result.token.id;
           // if ( this.token !== ""){
              this.pagar();
              
          //  }
            
            

          }
        });
      });
    }


  pagar(){
    let metadata = {
      nombre: this.cardholder,
      billing: this.billing
    }

      this.usuario.pagar( this.user, this.token, metadata )
        .then( ( resp ) => {
          this.viewCtrl.dismiss({
            data: resp
          })
         
        });

  }



}

