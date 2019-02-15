import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';





/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  messages = [];
  nickname = '';
  message = '';
  chats: Observable<any[]>;
 
  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private socket: Socket, 
              private toastCtrl: ToastController,
              private viewCtrl:ViewController
              ) {
              console.log(navParams);
              
              if ( this.navParams.data.usuario.nombre !== '' || this.navParams.data.usuario.sala !== '' ){
              
                this.nickname = this.navParams.data.usuario.nombre;
                 this.socket.connect();
                 this.socket.emit('entrarChat', { usuario:this.navParams.data.usuario.nombre, sala:this.navParams.data.usuario.sala }, ( data ) =>{
                 console.log(data);
                }); 
                        
              } else {
                console.log("Ocurrio un error");
                this.viewCtrl.dismiss( {data:"Error"});
              }
 
    this.getMessages().subscribe(message => {
      console.log("Recibo el mensaje en el subscribe");
      console.log(message);
      this.messages.push(message);
      console.log(this.messages);
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
    
      this.socket.emit('mensajePrivado', { mensaje: this.message }, (rmessage)=>{
      //this.messages.push(message);
      console.log(rmessage);
    
    });
    this.message = '';
    }
    
  
    
    
  
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('crearMensaje', (data) => {
        console.log("Recibo el mensaje");
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