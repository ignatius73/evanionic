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
user: User = {
  
};
msg: string = '';
fbid: any;

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
        console.log("Data en logi wiht email");
        console.log(data);
          loader.dismiss();
          if (data !== 3 ) {
           if ( this.usuario.us.length > 0 ){
             this.user = data[0];
             this.navCtrl.setRoot(CentralMensajesPage, { user: this.user });
            // this.navCtrl.push( CentralMensajesPage, { user: this.user } );
              
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
                this.usuario.pruebaMetodo( res.authResponse.userID)
                    .then( data => {
                      if( data['error'] === true ){
                        console.log("Algo malo paso aquí");
                      }
                      
                        if ( data['existe'] === false){
                          this.navCtrl.setRoot( NuevoUsuarioPage, { user: res.authResponse.userID });
                        }else{
                          this.user.email = data['usuario'][0]['email'];
                          console.log( this.user );
                          this.usuario.getUser( this.user )
                            .then( ( data ) => {
                             // console.log( data)
                              this.navCtrl.setRoot( CentralMensajesPage, { user: data[0] });
                            })
                            .catch( ( e ) =>{
                              console.log("Existe este error "  + e);
                            })
                        }
                        
                    });

               
            })
          
          .catch(e => console.log('Error logging into Facebook', e));

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
