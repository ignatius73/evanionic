import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';
import { ChatsProvider } from '../../providers/chats/chats';
import { OneSignalApiProvider } from '../../providers/one-signal-api/one-signal-api';
import { PushnotProvider } from '../../providers/pushnot/pushnot';
import { UsuarioProvider } from '../../providers/usuario/usuario';



@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  messages = [];
  nickname = '';
  message = '';
  sala = '';
  password = '';
  to = '';
  me = '';

 
 
  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private socket: Socket, 
              private toastCtrl: ToastController,
              private viewCtrl:ViewController,
              public db: ChatsProvider,
              private one: OneSignalApiProvider,
              public pushnot: PushnotProvider,
              public usuarios: UsuarioProvider
              ) {

              
                
                console.log("Voy a imprimir el navParams en la entrada al chat");
              console.log(navParams);
              
              if ( this.navParams.data.usuario.nombre !== '' || this.navParams.data.usuario.sala !== '' ){
                this.nickname = this.navParams.data.usuario.nombre;
                this.sala = this.navParams.data.usuario.sala;
                this.to = this.navParams.data.usuario.to;
                if ( typeof this.navParams.data.usuario.me === 'undefined' ){
                  this.me = this.usuarios.us[0].token;
                }else{
                  this.me = this.navParams.data.usuario.me;
                }
                //Obtengo los mensajes previos del chat
                this.db.cargarMensajesXSala( this.sala ).subscribe();
                                           
                
                
                this.socket.connect();
               this.socket.emit('entrarChat', { usuario:this.navParams.data.usuario.nombre, sala:this.navParams.data.usuario.sala, to:this.to }, ( data ) =>{
                 let datos = {
                   from: this.me,
                   sala: this.navParams.data.usuario.sala,
                   to: this.navParams.data.usuario.to,
                   nombre: this.navParams.data.usuario.nombre
                 }
                  this.one.createNotification( datos )
                    .then( (data1) => {
                      console.log(data1);
                    }) 
                    .catch( err =>{
                      console.log("Ocurrió el error " + err);
                }); 
                console.log(data);
              }) ;        
              } else {
                console.log("Ocurrio un error");
                this.viewCtrl.dismiss( {data:"Error"});
              }
 
    this.getMessages().subscribe(message => {
      
      console.log("Imprimo lo que recibo del socket");
      console.log(message);
      this.db.addChat(message);
      
     // this.messages.push(message);
     
    
  //    console.log(this.messages);
   
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }
 
  sendMessage() {
    console.log("Entro al sendMesagge");
    console.log(this.navParams.data.usuario.nombre);
    console.log(this.message);
    
      this.socket.emit('mensajePrivado', { mensaje: this.message,
                                           sala:this.navParams.data.usuario.sala,
                                           }, (rmessage)=>{

                                            let datos = {
                                              from: this.me,
                                              sala: this.sala,
                                              to: this.to,
                                              nombre: this.nickname
                                             }
                                             console.log("Voy a imprimir los datos que envío a la notificación cuando envío mensaje");
                                             console.log(datos);
                                             this.one.newMessage( datos )
                                                           .then( (data1) => {
                                                             console.log(data1);
                                                           }) 
                                                           .catch( err =>{
                                                             console.log("Ocurrió el error " + err);
                                                       }); 
            console.log("Estoy en el emit del sendMessage de la Chatroom");
            console.log(rmessage);
    
    });
    this.message = '';
    }
    
  
    
    
  
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('emitoMensaje', (data) => {
        
        console.log(data);
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {

      this.socket.on('disconnect', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}