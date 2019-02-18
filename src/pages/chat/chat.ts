import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
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


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socket: Socket,
              public modal: ModalController) {
              //  console.log(navParams.data.worker.name);
              //  this.nickname = navParams.data.worker.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  joinChat(){
    let usuario = {
      nombre: this.nickname,
      sala: this.sala,
      
    }
    
    let modal = this.modal.create('ChatroomPage', { usuario });
    modal.present();
    modal.onDidDismiss( (data) =>{
      console.log(data.data);
      
    });
    
  
  }

}
