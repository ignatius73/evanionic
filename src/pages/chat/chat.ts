import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { PushnotProvider } from '../../providers/pushnot/pushnot';
import { ChatroomPage } from '../chatroom/chatroom';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  nickname: any = '';
  sala: any = '';
  userChat :any;
  to: any;
  me: any;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socket: Socket,
              public modal: ModalController,
              private usuario: UsuarioProvider,
              public pushnot: PushnotProvider) {
                console.log("Imprimo los datos del navParams en Chat.ts");

              console.log(navParams.data);
              //  this.nickname = navParams.data.worker.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.pushnot.avisos = 0;
    if( Object.keys(this.pushnot.datosChat).length !== 0 ){
     this.sala = this.pushnot.datosChat.sala;
     this.to = this.pushnot.datosChat.from;
     this.me = this.pushnot.datosChat.me;
    }else{
      if( this.navParams.data.worker ){
      this.to = this.navParams.data.worker.token;
      this.me = this.usuario.us[0].token
      }
      
    }
  }

  joinChat(){
    console.log(this.usuario.us[0].token);
    console.log("JoinChat");
    console.log("Imprimo los datos de datosChat");
    console.log(this.pushnot.datosChat);
    
    let usuario = {
      nombre: this.nickname,
      sala: this.sala,
      to: this.to,
      me: this.me
      

    }

    console.log("Imrpimo el usuario que mando a la sala de Chat");
    console.log(usuario);
    
    let modal = this.modal.create('ChatroomPage', { usuario });
    this.navCtrl.setRoot( ChatroomPage, { usuario } );
    /*modal.present();
    modal.onDidDismiss( (data) =>{
      console.log(data.data);
      
    });*/
    
  
  }

}
