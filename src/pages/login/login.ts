import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { OauthProvider } from '../../providers/oauth/oauth';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';



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
    let msg: string = '';

    let loader = this.loading.create({});

    loader.present().then(() => {
      this.usuario.getUserPass( this.user )
      .then( data => {
          loader.dismiss();
          if (data !== 3 ) {
           if ( this.usuario.us.length > 0 ){
             this.user.email = this.usuario.us[0].email;
             
             this.navCtrl.setRoot( NuevoHomePage, { user: this.user } );
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
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(  user  =>  {
            this.oauth.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid);
              console.log(this.oauth.usuario);
              this.navCtrl.setRoot( NuevoHomePage, { user });
          })
          .catch( e =>  console.log( JSON.stringify(e)))
      })
    
    } else {
       this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log(res);
        let user = res.user;
        console.log(user.displayName);
        this.oauth.cargarUsuario(
          user.displayName,
          user.email,
          user.photoURL,
          user.uid);
          console.log(this.oauth.usuario);
          this.navCtrl.setRoot( NuevoHomePage, { user }); 
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
          this.navCtrl.setRoot( NuevoHomePage, { user }); 
      })
      .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
    });

  }

}
