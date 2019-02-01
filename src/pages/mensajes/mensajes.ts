import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
//Interfaces

import { Msg } from '../../interfaces/msg.interface';


/**
 * Generated class for the MensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {
  msg: any[] = [];
  church: string;
  mensaje: Msg = {};
  imgpreview: string = "";
  img64: any;
  msgs: Msg[] = [];



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuarios: UsuarioProvider,
              private picker: ImagePicker,
              private camera: Camera) {
    

      
               
        
  }

  cargarMensajes(){
        this.usuarios.cargarMensajes( this.church )
        .then( data => {
          this.msgs.push(...data['mensajes']);
          console.log( this.msgs );
          if ( data['error']){
            console.log( "Error de Datos");
          }
          

        });

      }

  
  
  ionViewDidLoad() {
    if ( typeof( this.navParams.data.user ) !== 'string' ){
      //Crear Mensaje
      console.log( this.usuarios.us )
      this.crearMensaje();
    } else {
      //Cargar Mensajes
      this.church = this.navParams.data.user;
      console.log( this.church) ;
      this.cargarMensajes();
    }
  }

  back(){
    this.navCtrl.pop();
  }

  crearMensaje(){
    this.mensaje.id_church = this.usuarios.us[0].church;
    this.mensaje.id_pastor = this.usuarios.us[0].id;
  
    if (this.imgpreview !== "" ){
      this.mensaje.messagejpg = this.imgpreview;
    }
  
    this.usuarios.crearMensaje( this.mensaje )
      .then( data =>{
        console.log ( data );
      });
    
    
  }

  subirFoto() {
    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount:1
    };
  
  
  
    this.picker.getPictures(options).then((results) => {
      
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imgpreview = 'data:image/jpeg;base64,' + results[i]; 
          this.img64 = results[i];
      }
    }, (err) => { 
      console.log("error seleccionando foto", JSON.stringify(err));
    });
  }
  
  tomarFoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL, // FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imgpreview = 'data:image/jpeg;base64,' + imageData;
     this.img64 = imageData;
     console.log(this.img64);
    }, (err) => {
         console.log( "Error ", JSON.stringify( err ));
    });
  }

}
