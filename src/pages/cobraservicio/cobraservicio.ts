import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Braintree, ApplePayOptions, PaymentUIOptions, PaymentUIResult } from '@ionic-native/braintree';
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
    // Your Braintree `Tokenization Key` from the Braintree dashboard.
// Alternatively you can also generate this token server-side
// using a client ID in order to allow users to use stored payment methods.
// See the [Braintree Client Token documentation](https://developers.braintreepayments.com/reference/request/client-token/generate/node#customer_id) for details.
BRAINTREE_TOKEN = 'sandbox_5gthrnf6_ts49hdmgjrs7vy6d';

// NOTE: Do not provide this unless you have configured your Apple Developer account
// as well as your Braintree merchant account, otherwise the Braintree module will fail.
/*appleOptions: ApplePayOptions = {
  merchantId: '<YOUR MERCHANT ID>',
  currency: 'USD',
  country: 'US'
};*/

paymentOptions: PaymentUIOptions = {
  amount: '5.00',
  primaryDescription: 'Subscription to CinC/month',

};

stripe = Stripe('pk_test_DF1o1fSjVXokHlz4p2lWqdz9');
card: any;
source: any;
token: any;



user: User = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private braintree: Braintree,
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
    

  /*  this.braintree.initialize(this.BRAINTREE_TOKEN)
  .then(() => this.braintree.presentDropInPaymentUI(this.paymentOptions))
  .then(( result:PaymentUIResult) => {
    if (result.userCancelled) {
      console.log("User cancelled payment dialog.");
    } else {*/
      this.usuario.pagar( this.user, this.token )
        .then( ( resp ) => {
          this.viewCtrl.dismiss({
            data: resp
          })
         
        });
     /* console.log("User successfully completed payment!");
      console.log("Payment Nonce: " + result.nonce);
      console.log("Payment Result.", result);
    }
  })
  .catch((error: string) => console.error(error));
  }*/

  }



}

