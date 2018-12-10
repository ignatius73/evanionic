import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { keyframes } from '@angular/core/src/animation/dsl';






@Injectable()
export class UsersProvider {
  private user: User;
  public lista : AngularFireList<any>;
  private fbURL: any;
  public ref: any;
  public usersURL:string = "https://evanapp-77653.firebaseio.com/users.json";
  public userURL:string = "https://evanapp-77653.firebaseio.com/users";
  public datos: User = {};
  

  
  


  
  constructor(public db: AngularFireDatabase,
              private http: HttpClient) {
    this.ref = this.db.database.ref().child('users');
     
    this.fbURL = "https://evanapp-77653.firebaseio.com/users";
    console.log('Hello UsersProvider Provider');
    
  }

    getUsuarios() {

      //return this.afdbRef;

    }
    addUsuario( user: User ){
      this.db.database.ref().child('/users/' + user.email).set({
        user
      });
    }

    addUser( user: User) {
      this.lista = this.db.list('/users');
      return this.lista.push( user );
    }

    getUser( user: User ) {
      this.lista = this.db.list('/users', ref => ref.child('users').orderByChild('email').equalTo(user.email));
      return this.lista;
      

    }

    getUsuario( user: User ) {
     let mail =  JSON.stringify(user.email);
    console.log("Correo "  + mail );
    return firebase.database().ref().child('users').orderByChild('email').equalTo(user.email)
      .once( 'child_added' , res => {
        console.log( typeof(res) );

        
        this.datos = res.val();
        console.log("RES " + JSON.stringify(res ));
       //this.datos = res.val();
       
       //return ( res );
       

      }
      
       );
    }
        

    addUserHttp( user: User ){
      let body = JSON.stringify( user );
      let headers = new HttpHeaders({
        'Content-Type': 'applicarion/json'
      });

      return this.http.post( this.usersURL, body, { headers } )
        .map ( (res: User) => {
          
          return JSON.stringify( res[0] );
        })

    }

    editUserHttp( user: User, key$: string ){
      let body = JSON.stringify( user );
      let headers = new HttpHeaders({
        'Content-Type': 'applicarion/json'
      });
      let url = `${ this.userURL }/${ key$ }.json`;
      return this.http.put( url, body, { headers } )
        .map ( res => {
          console.log( JSON.stringify( res ) );
          return JSON.stringify( res );
        })

    }

    /*getUserHttp( key$: string ){
      let url = `${ this.userURL }/${ key$ }.json`;
      console.log("Url " + url )
      return this.http.get( url )
        .map ( res => res.json());
    }*/
}
