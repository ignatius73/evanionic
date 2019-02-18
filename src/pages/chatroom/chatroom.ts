import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';
import { ChatsProvider } from '../../providers/chats/chats';



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

 
 
  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private socket: Socket, 
              private toastCtrl: ToastController,
              private viewCtrl:ViewController,
              public db: ChatsProvider
              ) {
              console.log(navParams);
              
              if ( this.navParams.data.usuario.nombre !== '' || this.navParams.data.usuario.sala !== '' ){
                this.nickname = this.navParams.data.usuario.nombre;
                this.sala = this.navParams.data.usuario.sala;
                this.password = this.navParams.data.usuario.password;
                //Obtengo los mensajes previos del chat
                this.db.cargarMensajesXSala( this.sala ).subscribe();
                                           
                
                
                this.socket.connect();
               this.socket.emit('entrarChat', { usuario:this.navParams.data.usuario.nombre, sala:this.navParams.data.usuario.sala }, ( data ) =>{
                 console.log(data);
                }); 
                        
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
    console.log(this.message);
    
      this.socket.emit('mensajePrivado', { mensaje: this.message }, (rmessage)=>{
            console.log("Estoy en el emit del sendMessage de la Chatroom");
            console.log(rmessage);
    
    });
    this.message = '';
    }
    
  
    
    
  
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('crearMensaje', (data) => {
        
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