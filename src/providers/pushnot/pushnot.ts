import { OneSignal } from '@ionic-native/onesignal';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { UsuarioProvider } from '../usuario/usuario';
import { User } from '../../interfaces/user.interface';
import { ChatPage } from '../../pages/chat/chat';
import { Subject, Observable } from 'rxjs';






@Injectable()
export class PushnotProvider {
  onsignalids:any;
  onesignaTags: any;
  ChatPage: any;
  avisos:number = 0;
  datosChat: any = {};
  private clientes$ = new Subject<any>();

  constructor(private oneSignal: OneSignal,
              private platform: Platform) {
    
  }

  init_notifications(){
    if ( this.platform.is('cordova')){
      this.oneSignal.startInit('7387dde9-6743-47fb-bb11-c110f6f4c7c6', '473038448469');
      
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(( data ) => {
        this.avisos = this.avisos + 1;
           
           console.log("Notificacion recibida");
           console.log(data.payload.additionalData);
           this.datosChat = data.payload.additionalData.datos;
    });

    this.oneSignal.handleNotificationOpened().subscribe(( ) => {
      console.log("Notificación abierta");
    
    });

this.oneSignal.endInit();
  
} else {
  console.log('Esto no es OneSignal Compatible');
}

}

generoTags( user ){
  console.log(user);
  //Busco si el tag ya existe
  /*return new Promise(( resolve, reject ) =>{*/
      this.oneSignal.getTags()
        .then( data => {
          console.log("Imprimo tipo de data");
          console.log(typeof data);
          console.log( Object.keys(data).length )
          if ( Object.keys(data).length === 0 ){
            console.log("Data no existe");
            //Creo el tag celular
            console.log("Token " + user[0].token);

            this.oneSignal.sendTag( 'token', user[0].token );
            
          } else {
            console.log("Imprimo lo que me devolvió el sendTag");
            console.log(data);
            console.log("Imprimo el token que vino de respuesta del sendtag");
            console.log(data.token);
            console.log("Imprimo el token en mi user");
            console.log(user[0].token);
              if ( data.token !== user[0].token){
                console.log( "Los tokens son distintos");
                this.oneSignal.sendTag( 'token', user[0].token );
              }else{
                console.log("el tag ya existe");
              }
         
          }
        })
 /* })*/

}
/*
agregarMensaje() {
  this.avisos = this.avisos + 1
  
  this.clientes$.next(this.avisos);
}

getMensajes$(): Observable<any> {
  return this.clientes$.asObservable();
}*/

}
