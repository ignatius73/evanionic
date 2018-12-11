import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { OauthProvider } from '../../providers/oauth/oauth';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { User } from '../../interfaces/user.interface';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NuevoUsuarioPage } from '../nuevo-usuario/nuevo-usuario';
import { Users2Provider } from '../../providers/users2/users2';
import { Observable } from 'rxjs';
import { UsuarioProvider } from '../../providers/usuario/usuario';










@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userLogged: User = {};
  login: any;
  existe: AngularFireList<any>;
  public datos: User = {};
  exist: User = {};
  usersList$: Observable<User[]>;
  prueba: any[] = [];
  res : any;
  
  

  constructor(public modalCtrl: ModalController,
              public navCtrl: NavController,
              public user: OauthProvider,
              private anFAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              public users2: Users2Provider,
              public users: UsersProvider,
              public usuario: UsuarioProvider) {

            this.userLogged = this.user.usuario;

/*           this.usuario.addUser( this.userLogged ).then(
             ( dat ) => {
                 for ( let k in dat['usuario']) {
                   this.prueba.push( dat['usuario'][k]);              
                   }

                  console.log( this.prueba );
                  //this.exist.push( dat.usuario );
          
             }
             
           );

          
            this.anFAuth.authState.subscribe( res => {
              if (!res) {
                this.navCtrl.setRoot(LoginPage);
              } 
            })
            
  }

  signOut() {
    this.anFAuth.auth.signOut().then( ( res => {
      this.user.usuario = {};
      this.navCtrl.setRoot(LoginPage);
    }));
    
  }

  mostrar_modal(){

    let modal = this.modalCtrl.create( NuevoUsuarioPage );
    modal.present();
    modal.onDidDismiss( data => {
      this.datos = data;
    })
*/
  }


}
