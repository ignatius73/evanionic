import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { OauthProvider } from '../../providers/oauth/oauth';
import { GooglePlus } from '@ionic-native/google-plus';
import { User } from '../../interfaces/user.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CentralMensajesPage } from '../central-mensajes/central-mensajes';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';

declare var FB;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user: User = {};
msg: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afdb: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              public oauth: OauthProvider,
              private platform: Platform,
              private fb: Facebook,
              private gp: GooglePlus,
              private usuario: UsuarioProvider,
              private loading: LoadingController
                            ) {

                              console.log( this.user );
                
  }
  
  ionViewDidLoad() {
    this.user = {};
    
  
  
  
    
  }
  

  //Comentar para producción
 /* signInWithFacebook() {
    this.oauth.cargarUsuario(
      "",
      "ignatius@ogasistemas.com.ar",
      "",
      "");
      let user = this.oauth.usuario;
      this.navCtrl.setRoot( NuevoHomePage, { user });
  }*/
 /* signUp(){
    this.navCtrl.setRoot( NuevoUsuarioPage );
  }*/
  signInWithEmail(){
    
    let loader = this.loading.create({});

    loader.present().then(() => {
      this.usuario.getUserPass( this.user )
      .then( data => {
          loader.dismiss();
          if (data !== 3 ) {
           if ( this.usuario.us.length > 0 ){
             this.user.email = this.usuario.us[0].email;
             this.navCtrl.push( CentralMensajesPage, { user: this.user } );
            // this.navCtrl.push( NuevoHomePage, { user: this.user } );
           }else{
            this.msg = data['mensaje'] ;}
          }else{
            this.msg = "Demasiados intentos erróneos";
          }
      });
    });  
    
    
    
  }
//Descomentar para producción
  signInWithFacebook() {
    if ( this.platform.is('cordova') ) {
      this.fb.login(['public_profile', 'user_friends', 'email'])
         .then((res: FacebookLoginResponse) => {
           console.log('Logged into Facebook!', res);
           console.log( res );
                this.usuario.chequeaUserFB( res.authResponse.userID);

                this.navCtrl.push( NuevoUsuarioPage, { user: res.authResponse.userID });
           // });
          })
          .catch(e => console.log('Error logging into Facebook', e));

        } else {
          FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log(response.id);
               this.usuario.chequeaUserFB(response.id)
                 .then( data => {
                 console.log(data);
               })
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
            
        }

      
    
   
  }

 
  signOut() {
    firebase.auth().signOut();
   // this.afAuth.auth.signOut();
  }

  signInWithGoogle() {
    this.gp.login({
      'webClientId': '473038448469-8vavf4bkrm5j9ahmr7e6hfikolnes84c.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( user => {
        console.log("Firebase success: " + JSON.stringify(user));
        this.oauth.cargarUsuario(
          user.displayName,
          user.email,
          user.photoURL,
          user.uid);
          console.log(this.oauth.usuario);
          this.navCtrl.setRoot( CentralMensajesPage, { user }); 
      })
      .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
    });

  }

}
