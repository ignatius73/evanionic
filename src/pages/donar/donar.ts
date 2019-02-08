import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { User } from '../../interfaces/user.interface';
//import { AmountPipe } from '../../pipes/amount/amount';
import { Charge } from '../../interfaces/charge.interface';




declare var Stripe;

@IonicPage()
@Component({
  selector: 'page-donar',
  templateUrl: 'donar.html',
  
})
export class DonarPage {
  stripe = Stripe('pk_test_DF1o1fSjVXokHlz4p2lWqdz9');
  user: User = {};
  amount: number;
  card: any;
  source: any;
  token: any;
  pago: boolean = false;
  customer: any = {};
  cardholder: any;
  billing:any;
  resultado: any;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuario: UsuarioProvider) {
                
                this.user = this.navParams.data.user;
                
                //Chequeo si el usuario tiene el customer guardado en su storage

                

                
  }

  ionViewWillEnter(){
    
  }


  ionViewDidLoad() {
  
    this.usuario.chequeoPago()
                  .then( data => {
                    console.log(data);
                    if ( data['pago'] === true ) {
                      console.log("Imprimo pago true");
                      console.log(this.pago);
                      this.pago = true;
                      this.usuario.obtengoCustomer(data['customer'])
                        .then( (data) =>{
                           this.customer = data['customer'];
                            
                        })
                        .catch( ( e ) => console.log("Error " + e))

                    } else {
                      console.log("Imprimo pago");
                      console.log(this.pago);
                      this.setupStripe();
                    }

                  })
                  console.log( this.pago );
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
    };;
    
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
          console.log(result);
          this.customer.default_source = result.token.id;
         // if ( this.token !== ""){
            this.donar();
            
        //  }
          
          

        }
      });
    });

}

donar(){
  console.log( this.customer );
  console.log(this.amount);
  if ( this.customer ){
    let charge: Charge;
    charge = {  
      amount : this.amount*100,
      currency : 'usd',
      customer : this.customer.id,
      source : this.customer.default_source,
      description : `Donación hecha por ${ this.user.name } para la Iglesia ${ this.user.church }`,
      metadata: {
        nombre: this.cardholder,
        billing: this.billing
      }

  }
  console.log(charge);
  this.usuario.crearDonacion(charge)
    .then( data => {
      this.resultado= {

        title: "Gracias!",
        status: "Operación Exitosa",
        message: "Muchas gracias por tu donación",
        img: "../../assets/imgs/400.jpg"

      //  type: e.type



      }
      console.log("Imprimo la respuesta de CrearDonacion");
      console.log(data);
    })
    //, (err) => { console.log(err) }
   // )
    .catch( e => {
      console.log(e);
      this.resultado= {

        title: "No pudo procesarse su petición",
        status: e.status,
        message: e.message,
        type: e.type,
        img: "../../assets/imgs/400.jpg"



      }
      
    })
  
  //Voy a crear el objeto Charge para enviar a Stripe
    

}



}

continuar(){
  this.navCtrl.pop();
}

}
