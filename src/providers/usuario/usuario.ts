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
import { Cordova } from '@ionic-native/core';
import { URL_PAGOS } from '../../config/url.pagos';
import { resolveDefinition } from '@angular/core/src/view/util';
import { ThrowStmt, analyzeAndValidateNgModules } from '@angular/compiler';
import { platformBrowser } from '@angular/platform-browser';




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

    getUserId(user) {
    

      let data = { "id": user.idUsuario
                             };
              
      return new Promise((resolve, reject) => {
        this.http.post(URL_SERVICIOS+'usuarios', data)
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
   // console.log ( data );
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

    existeUsuario( user ){
      let data = { "email": user.email
                 };
  
    return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usuarios', data)
        //.map( resp => resp )
        .subscribe( (data: any)  =>{
              this.existe = data['existe'];//console.log( data );
              console.log( "Existe en UsuarioProvider");
              console.log( this.existe);
              
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
          console.log(data1);
         
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
        .subscribe( ( data) => {
          console.log("Voy a listar la data que me devuelve editarUsuario");
            console.log( data );
            if ( data['error'] === true ){
                  reject( data['error']);
                    } else {
                      this.getUser( user)
                        .then( user =>{
                          console.log("oBTENGO EL uSER ACTUALIZADO");
                          console.log(user);
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
       // console.log( "User en el provider")
       // console.log( user );
        return new Promise( (resolve, reject) => {

           this.http.post( url, customer)
             .subscribe( (data) =>{
               console.log("Obtengo respuesta de la existencia de Customer");
               console.log( data );
                 if ( data['res'] === false){
                   reject( data );
                 }
                 console.log(data['customer']['data'].length );
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
          
         /* this.chequeoPago()
            .then( (data)=>{
              console.log("Estoy chequeando token de Customer");
              
              if ( data['pago'] === true ) {
                console.log(data);
                midata.customer = data['customer']; 
                console.log("midata"); 
                console.log(midata);               
              }
          });
          console.log("Aún no pagó el usuario");
          this.http.post( URL_SERVICIOS+'usuarios/pago', user)
                  .subscribe( data => {
                    console.log( data );
                    if (data['error'] === false) {
                      console.log( "Respuesta de PHP");
                      console.log( data['pago']);
                      console.log( "Respuesta de Token");
                      console.log( midata.customer );
                      if((data['pago'] === '') && (midata.customer === '')){
                        console.log("están los dos vacíos");
                        midata.pago = false;
                        
                      }else{
                        if (data['pago'] === midata.costumer){
                          midata.pago = true;

                        }else{
                          if ( data['pago'] === '' || midata.customer !== ''){
                            this.guardoPagoEnDB( user, midata )
                            
                          }

                          if ( data['pago'] !== '' || midata.costumer === ''){
                            console.log("Entre porque midatacostumer está vacío");
                            console.log(midata);
                            this.obtengoCustomer( data['pago'] )
                              .then( cus => {
                                console.log("Obtengo lo que me devuelve el busca Costumer");
                                console.log(cus);
                                if ( cus.customer.id === data['pago']) {
                                  this.guardarPago(data['pago']);
                                }else{
                                  midata.customer = cus.customer.id;
                                  this.guardoPagoEnDB( user, midata );
                                }
                              })
                            
                          }
                          midata.pago = true;
                        }
                        
                        
                      }
                      resolve(midata.pago);
                    }else{
                      reject(data['error']);
                    }
          });
            });*/
    }

      pagar( user, token, metadata ){
        // console.log( "User en el provider")
        // console.log( user );
       /* console.log( result );
        console.log( user );*/

        console.log("Voy a mostrar el result");
          // console.log( result );


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
        console.log( "Voy a listar el usuario");
        console.log( usuario );


        let url: any;
        ///Chequeo si existe el token en storage
        if ( this.platform.is('cordova') ) {
          url = URL_PAGOS+'createSubscription';
        } else {
          url = '/suscripcion';
         
        }
   
            return new Promise( (resolve, reject) => {
                    this.http.post( url, usuario)
            
                  
             
                     // this.http.post( '/api', usuario)
                      
                         .subscribe(  (data) => {
                               console.log("Listo Data");
                               console.log( data );
                               if ( data['res'] === 'ok'){
                                 let respuesta = {
                                  'mensaje': 'exito'
                                }
                                console.log("Voy a listar el user email");
                                console.log( user.email );
                                       
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
                    
                    console.log( "Voy a imprimir el el cus en storage")
                    console.log( cus );
                    if ( !cus ) {
                      console.log("Sali por el resolve false");
                      resolve(false);
                    }else{
                      console.log("Sali por el resolve true");
                      console.log(cus);
                      let customer = {
                        'pago': true,
                        'customer': cus
                      }
                      resolve(customer);
                    }

                  });
               
                 
                  });
                
          }else{
            console.log("No es cordova en chequeo pago");
            console.log(localStorage.getItem('cus'));
              if ( !localStorage.getItem('cus') ) {
                console.log("Entro al if de localstorage");
                let customer = {
                  'pago': false
                }
                resolve(customer);
                
              }else{
                console.log("Existe el cus en localstorage");
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
        console.log("Voy a imprimir el usuario que tengo en GuardoPagoen Db");
        let user = {
          'email': usuario.email,
          'cus': data.customer.id
        }
        console.log(user);
        this.http.post( URL_SERVICIOS + 'usuarios/pagar', user)
        .subscribe( ( data ) => {
          if ( data['error']== true ){
                console.log( data['mensaje'])
          }

          
        });
      }

      guardoPagoEnDBUni( usuario, data ){
        console.log("Voy a imprimir el usuario que tengo en GuardoPagoen Db");
        let user = {
          'email': usuario.email,
          'cus': data.customer
        }
        console.log(user);
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
        console.log("Imprimo Cus en obtengoCustomer");
        console.log(cus);
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
                  console.log(data);
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
        
        console.log("Voy a imprimir el login en usuario");
        console.log(this.login);
        return new Promise( (resolve, reject ) => {
          this.cargar_storage()
              .then( () => {
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
                  console.log("Voy a imprimir el login en usuario después de borrarlo");
                  console.log(this.login);

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
           console.log("Ya envié el mail");
            console.log( data )
          });
      }

    } 