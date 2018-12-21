import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { User } from '../../interfaces/user.interface';
import { Login } from '../../interfaces/login.interface';
import { Msg } from '../../interfaces/msg.interface';



import { AlertController, GESTURE_REFRESHER, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { storage } from 'firebase';


@Injectable()
export class UsuarioProvider {
  
  user: User = {};
  existe: boolean = false;
  us: any[] = [];
  results: any[] = [];
  login: Login = {};
  pagina:number = 0;
  chapel:any[] =[];
  tries: number = 0;
  mensaje: Msg = {};
  mensajes: Msg[] = [];
  nomsg: string = '';


  
  constructor(public http: HttpClient,
              private alert: AlertController,
              private platform: Platform,
              private storage: Storage
              ) {
      console.log('Hello UsuarioProvider Provider');
     
  }
 
  getUser(user) {
    

    let data = { "email": user.email };
  
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios', data)
        //.map( resp => resp )
        .subscribe( (data: any)  =>{
              this.existe = data['existe'];//console.log( data );
              console.log( "Existe en UsuarioProvider");
              console.log( this.existe);
              this.us = [];
              this.us.push( ...data['usuario']); 
              this.generoLogin();
              resolve(this.us);
        
                  
                  
                  if( data.error ) {
                    reject(data.error);
                  }
                  
                });
                 
                });
                
              }

    getUserPass(user) {
    

    
    let data = { "email": user.email,
                  "password": user.password };
    console.log ( data );
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios/getUser/', data)
        //.map( resp => resp )
        .subscribe( (data: any)  =>{
           
            if (data['existe'] === true){
              
              this.existe = data['existe'];//console.log( data );
              console.log( "Existe en UsuarioProvider");
              //console.log( this.existe);
              this.us = [];
              this.us.push( ...data['usuario']); 
              this.generoLogin();
              resolve(this.us);

            }else{
              //console.log( this.tries );
              if (this.tries <= 2 ){
                
                resolve( data );
                this.tries += 1;
              }
                resolve( this.tries);
              
            }
              
        
      
                  
                  if( data.error ) {
                    reject(data.error);
                  }
                  
                });
                 
                });
                
              }          
            
    nuevoUsuario( user: User ){
      console.log( user );
     
      return new Promise( (resolve, reject) => {
        this.http.post( URL_SERVICIOS+'usuarios/crear_usuario', user)
          .subscribe( ( data:any) => {
              console.log( data.existe );
              if ( data.existe === false ){

                      if ( data.error === true ) {
                        reject( data.error);
                      } else {
                        console.log( data['query']);
                        resolve( data );
                      }
                  }
                  else{
                    resolve( data );
                  }
                });
                  
                });
     }

    generoLogin( ){

      for ( let i=0; i < this.us.length; i++ ) {
        
        this.login.idUsuario = this.us[i].id;
        this.login.token = this.us[i].token;
      }

      if ( this.login.token !== "" ) {
          if ( this.platform.is('cordova') ) {
            this.storage.set('token', this.login.token);
            this.storage.set('idUsuario', this.login.idUsuario);
          } else {
            localStorage.setItem('token', this.login.token);
            localStorage.setItem('idUsuario', this.login.idUsuario);
          }
      }

    }

    cargar_storage(){
      let promesa = new Promise( (resolve, reject ) => {

        if ( this.platform.is("cordova") ) {

          this.storage.ready()
            .then( () => {
              this.storage.get('token')
                .then( token => {
                  if ( token ) {
                    this.login.token = token;
                  }
                });
              this.storage.get('idUsuario')
                .then( iduser => {
                  if ( iduser ) {
                    this.login.idUsuario = iduser;
                  }
                });
                resolve();
                });
              
            }
        else {

            if ( localStorage.getItem('token') ) {
              this.login.token = localStorage.getItem('token');
            }
            if ( localStorage.getItem('idUsuario') ) {
              this.login.idUsuario = localStorage.getItem('idUsuario');
            }

            resolve();
          }
          
          
        });


        }

        searchChapel( data) {
          this.chapel = [];
          let data1 = { "name_church": data
                         };
          console.log( "Data " + JSON.stringify(data1) );
          return new Promise( ( resolve, reject ) => {
            this.http.post(URL_SERVICIOS+'Chapel/searChapel', data1)
            //.map( resp => resp )
            .subscribe( (resp: any)  =>{
                  this.existe = resp['existe'];//console.log( data );
                  this.chapel.push( ...resp['iglesias']); 
                  this.pagina += 1;
                  console.log( resp['query']);
                  
                  resolve(this.chapel);
                  if( resp.error ) {
                        reject(resp.error);
                      }
                      
                    });
                     
                    });
        
        }

    creaChapel( data ){
      return new Promise( (resolve, reject) => {
        this.http.post(URL_SERVICIOS+'Chapel/newChapel', data)
          .subscribe ( ( resp ) => {
            console.log( resp );
              if ( resp['error'] === true ) {
                console.log( resp['error']);
                reject( resp['error']);
              }else{
                resolve( resp );
              }
          })
      })
    }

    crearMensaje( data ){
      this.mensaje = data;

      return new Promise( (resolve, reject) => {
        this.http.post( URL_SERVICIOS+'Mensajes/crearMensaje', this.mensaje)
          .subscribe( data => {
            resolve( data );

            if( data['error'] ){
              reject(data);
            }         
           });
      });

    }

    cargarMensajes ( data ){
      console.log( data );
      this.mensajes = [];
      return new Promise ( (resolve, reject) => {
        this.http.get( URL_SERVICIOS+'Mensajes/cargarMensajes/'+ data)
          .subscribe( (data:any) => {
            if ( !data['mensaje']){
              this.mensajes.push( ...data['mensajes']);
            } else {
              this.nomsg = data['mensaje'];
            }
            
            resolve( data );

            if( data.error ){
              reject( data.error );
            }
          })
      })
    }

    editarUsuario( user ){
      console.log( user );
     
    return new Promise( (resolve, reject) => {
      this.http.post( URL_SERVICIOS+'usuarios/editar_usuario', user)
        .subscribe( ( data:any) => {
            console.log( data );
            if ( data['error'] !== 0 ){
                  reject( data['error']);
                    } else {
                      resolve( data );
                    
                }
                
              });
                
              });
         
        }

      }
 