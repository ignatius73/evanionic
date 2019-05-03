import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';


import { User } from '../../interfaces/user.interface';
import { Login } from '../../interfaces/login.interface';
import { Msg } from '../../interfaces/msg.interface';



import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Cordova } from '@ionic-native/core';
import { URL_PAGOS } from '../../config/url.pagos';
import { resolveDefinition } from '@angular/core/src/view/util';
import { ThrowStmt, analyzeAndValidateNgModules, ClassStmt } from '@angular/compiler';
import { platformBrowser } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';




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
              private platform: Platform,
              private storage: Storage
              ) {
      console.log('Hello UsuarioProvider Provider');
     
  }
 
  getUser(user) {
    

    let data = { "email": user.email
                 };
  
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios', data)
        .subscribe( (data: any)  =>{
              this.existe = data['existe'];
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

    getUserId(user) {
    

      let data = { "id": user.idUsuario
                             };
              
      return new Promise((resolve, reject) => {
        this.http.post(URL_SERVICIOS+'usuarios', data)
          .subscribe( (data: any)  =>{
              this.existe = data['existe'];
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
   
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios/getUser/', data)
        .subscribe( (data: any)  =>{
           
            if (data['existe'] === true){
              
              this.existe = data['existe'];
              this.us = [];
              this.us.push( ...data['usuario']); 
              this.generoLogin();
              resolve(this.us);

            }else{
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
               if ( data.existe === false ){

                  if ( data.error === true ) {
                        reject( data.error);
                  } else {
                        this.http.post( URL_SERVICIOS+'usuarios/validar_usuario', user)
                        .subscribe( (data1) =>{
                         
                        })
                        resolve( data );
                      }
                  }
                  else{

                    resolve( data );
                  }
                });
                  
                });
     }

validarUsuario( user: User){
      let data = { "email": user.email
                 };
      this.http.post( URL_SERVICIOS+'usuarios/validar_usuario', data)
        .subscribe( data =>{
          
        })
        
    }

existeUsuario( user ){
      let data = { "email": user.email
                 };
  
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios', data)
        
        .subscribe( (data: any)  =>{
              this.existe = data['existe'];
                   
              resolve(this.existe);
        
                  
                  
                  if( data.error ) {
                    reject(data.error);
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
      return new Promise( (resolve, reject ) => {

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
                resolve( this.login );
                });
              
            }
        else {

            if ( localStorage.getItem('token') ) {
              this.login.token = localStorage.getItem('token');
            }
            if ( localStorage.getItem('idUsuario') ) {
              this.login.idUsuario = localStorage.getItem('idUsuario');
            }

            resolve( this.login);
          }
          
          
        });


        }

searchChapel( name ) {
          this.chapel = [];
          let data1 = name;
         
         
          return new Promise( ( resolve, reject ) => {
            this.http.post(URL_SERVICIOS+'Chapel/searChapel', data1)
                .subscribe( (resp: any)  =>{
                  this.existe = resp['existe'];
                  this.chapel.push( ...resp['iglesias']); 
                  this.pagina += 1;
                  
                  
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
            
              if ( resp['error'] === true ) {
                
                reject( resp['error']);
              }else{
                resolve( resp );
              }
          })
      })
    }

editaChapel( data ){
      return new Promise( ( resolve, reject ) => {
        this.http.post(URL_SERVICIOS+'Chapel/editaChapel', data)
          .subscribe( (resp) => {
            if( resp['error'] === true ){
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
     
     
    return new Promise( (resolve, reject) => {
      this.http.post( URL_SERVICIOS+'usuarios/editar_usuario', user)
        .subscribe( ( data) => {
         
            if ( data['error'] === true ){
                  reject( data['error']);
                    } else {
                      this.getUser( user)
                        .then( user =>{
                          
                          resolve(user);
                        })
                        .catch( err => {
                          console.log("ocurrió el error " + err);
                        })
                      
                    
                }
                
              });
                
              });
         
        }
      
pago( user ){
       
        
        let url: string;
        if ( this.platform.is('cordova') ) {
          url = URL_PAGOS+'existeCustomer';
        } else {
          url = URL_PAGOS+'existeCustomer';
         
        }
        let customer = {
          'email': user.email
        }

        let midata: any = {
          'customer':'',
          'pago': false
        };
       
        return new Promise( (resolve, reject) => {

           this.http.post( url, customer)
             .subscribe( (data) =>{
              
                 if ( data['res'] === false){
                   reject( data );
                 }
                
                if ( data['customer']['data'].length > 0 ){
                  midata.pago = true;
                  midata.customer = data['customer']['data'][0].id;
                    resolve( midata );
                  }else{
                    midata.pago = false;

                    resolve( midata );
                  }
                  
                
                            });
        });
          
     }

pagar( user, token, metadata ){
      
  let usuario = {
          "firstName": user.name,
            "lastName" : user.surname,
            "email" : user.email,
            "phone" : user.phone,
            "token": token,
            "metadata": {
              nombre: metadata.nombre,
              billing: metadata.billing
            }
            

        }
     

        let url: any;
        ///Chequeo si existe el token en storage
        if ( this.platform.is('cordova') ) {
          url = URL_PAGOS+'createSubscription';
        } else {
          url = '/suscripcion';
         
        }
   
            return new Promise( (resolve, reject) => {
                    this.http.post( url, usuario)
                     .subscribe(  (data) => {
                              if ( data['res'] === 'ok'){
                                 let respuesta = {
                                  'mensaje': 'exito'
                                }
                                resolve (respuesta);
                                this.guardarPago( data['customer']['id']);
                                this.guardoPagoEnDB( user, data );
                              }else{
                                ///Algun problema con la tarjeta
                                let error = {
                                  status: data['statusCode'],
                                  message: data['message'],
                                  type: data['type']
                                }
                                reject( error );
                              }
                        }, (err) =>{
                        
                          console.log( err );
                          let error = {
                            status: err.status,
                            message: err.statusText,
                            type: err.name
                          }
                          reject( error );
                      });
                   });
                  }        
    

    

guardarPago( cus: any ){
         console.log("Guardo el Cus");
          if ( this.platform.is('cordova') ) {
            this.storage.set('cus', cus);
           
          } else {
            localStorage.setItem('cus', cus);
            
          }
      }
       

chequeoPago() {
        return new Promise( (resolve, reject ) => {

          if ( this.platform.is("cordova") ) {
  
            this.storage.ready()
              .then( () => {
                this.storage.get('cus')
                  .then( cus => {
                    if ( !cus ) {
                     
                      resolve(false);
                    }else{
                      
                  
                      let customer = {
                        'pago': true,
                        'customer': cus
                      }
                      resolve(customer);
                    }

                  });
               
                 
                  });
                
          }else{
            
              if ( !localStorage.getItem('cus') ) {
               
                let customer = {
                  'pago': false
                }
                resolve(customer);
                
              }else{
                
                let cus = localStorage.getItem('cus');
                let customer = {
                  'pago': true,
                  'customer': cus
                }
                
                resolve(customer);
              }
        }
       });
      }

guardoPagoEnDB( usuario, data ){
        
        let user = {
          'email': usuario.email,
          'cus': data.customer.id
        }
        
        this.http.post( URL_SERVICIOS + 'usuarios/pagar', user)
        .subscribe( ( data ) => {
          if ( data['error']== true ){
                console.log( data['mensaje'])
          }

          
        });
      }

guardoPagoEnDBUni( usuario, data ){
        
        let user = {
          'email': usuario.email,
          'cus': data.customer
        }
        
        this.http.post( URL_SERVICIOS + 'usuarios/pagar', user)
        .subscribe( ( data ) => {
          if ( data['error']== true ){
                console.log( data['mensaje'])
          }

          
        });
      }

obtengoCustomer( cus ){
        let url: string;
        if ( this.platform.is('cordova') ) {
          url = URL_PAGOS+'obtengoCustomer';
        } else {
          url = '/customer';
         
        }
        
        let customer = {
          'cus': cus
        }
        return new Promise ( ( resolve, reject ) => {
          this.http.post(url, customer)
            .subscribe( ( data ) => {
              resolve( data );
              reject( data );
            })
        })
      }
crearDonacion( charge ){
        
        let url: string;
        if ( this.platform.is('cordova') ) {
          url = URL_PAGOS+'creoDonacion';
        } else {
          url = '/creoDonacion';
         
        }
        return new Promise( (resolve, reject) => {
            this.http.post( url, charge )
              .subscribe( (data) =>{
                  
                    if ( data['res'] === 'ok' ){
                      resolve(data);
                    }else{
                      console.log("Salgo Error 400");
                      
                        let error = {
                          type: data['type'],
                          message: data['message'],
                          status: data['statusCode']
                        }
                        
                        reject(error);
                     
                     
                    }        
        }, err =>{
          let error = {
            status: err.status,
            message: err.statusText,
            type: err.name
          }
          reject( error );
        });
        
      }); 
        
      }

pruebaMetodo( userID ){
        let user = {
          "userID": userID
        }
        return new Promise( (resolve, reject) =>{
          this.http.post( URL_SERVICIOS + 'usuarios/nombreNuevo', user)
            .subscribe( data => {
             if ( data['error'] === true ){
                reject( data['mensaje']);
              }
               resolve(data);
               
            })
        });
      }

cerrarSesion(){
        
        
        return new Promise( (resolve, reject ) => {
          this.cargar_storage()
              .then( () => {
                //console.log( "Entro a cargar_storage");
                if ( this.platform.is('cordova')){
                    this.storage.remove('token');
                    this.storage.remove('idUsuario');
                    if( this.storage.get('cus') ){
                      this.storage.remove('cus');
                    }
              
                  }else{
                    localStorage.removeItem('token');
                    localStorage.removeItem('idUsuario');
                    if( localStorage.getItem('cus') ){
                      localStorage.removeItem('cus');
                    }
                  }


                  this.us = []; 
                  this.login = {};
                  resolve();             
                  } )
              .catch( ( err )=> {
                  console.log("Ocurrió el error " + err);
                  reject();
              })
      




       });
            

      
      }

recuperarPass( user ){
        this.http.post( URL_SERVICIOS + 'usuarios/cambiarPass', user)
        .subscribe( ( data ) => {
          
          });
      }


contratar( worker, user ){
  console.log("Contratado");
  console.log(worker);
  console.log("Contratante");
  console.log(user);
  let usuarios = {
    'idContratante': user.id,
    'idContratado':worker.id
  }
  return new Promise( ( resolve, reject ) => {
    this.http.post( URL_SERVICIOS + 'usuarios/contratar', usuarios)
      .subscribe( data => {
        if( data['error'] === true ){
          reject( data );
        }
        resolve(data);
    });
});
}

valorar( user, valor){
  console.log( user );
  let valores = {
    'id': user.idUser,
    'valoracion': valor
  }
  console.log(valores);
  return new Promise( ( resolve, reject ) => {
    this.http.post( URL_SERVICIOS + 'usuarios/valorar', valores )
      .subscribe( data => {
        if( data['error'] === true ){
          reject( data );
        }
        resolve(data);
    });
});
}







} 