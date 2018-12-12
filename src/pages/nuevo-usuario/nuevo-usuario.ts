import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, Platform } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../interfaces/user.interface';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { URLSearchParams } from '@angular/http';
import { Users2Provider } from '../../providers/users2/users2';
import { OauthProvider } from '../../providers/oauth/oauth';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SearchChapelPage } from '../search-chapel/search-chapel';
import { Chapel } from '../../interfaces/chapel.interface';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';





/**
 * Generated class for the NuevoUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-usuario',
  templateUrl: 'nuevo-usuario.html',
})
export class NuevoUsuarioPage {

  user: User = {};
  imgpreview: string = "";
  img64: any;
  titulo: any;
  nuevo: boolean = false;
  uid: any;
  chap: Chapel = {}; 
  aux: string;
  editar: boolean = false;
  

  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public users: UsersProvider,
              private camera: Camera,
              private picker: ImagePicker,
              private _cap: CargaArchivoProvider,
              public users2: Users2Provider,
              public oauth: OauthProvider,
              public _us: UsuarioProvider,
              public modalCtrl: ModalController,
              public navCtrl: NavController
      
    ) {
      console.log( navParams );

      if ( navParams.data.user ){
        //this.user. = navParams.data.user.user;
        this.user.email = navParams.data.user.email;
      }
      this.user.email = oauth.usuario.email;
      this.user.age = oauth.usuario.age;




      
  }
  
  ionViewWillEnter(){
    if ( this.navParams.data.user ){
      this.editar = true;
      this.user.email = this.navParams.data.user.email;
      this.user.name = this.navParams.data.user.name;
      this.user.surname = this.navParams.data.user.surname;
      this.user.age = this.navParams.data.user.age;
      this.user.address = this.navParams.data.user.address;
      this.user.celular = this.navParams.data.user.celular;
      this.user.zip = this.navParams.data.user.zip;
      this.user.church = this.navParams.data.user.church;
      if(this.navParams.data.user.imagen == ""){
        this.user.imagen = this.oauth.usuario.imagen;
      }else{
        this.user.imagen = this.navParams.data.user.imagen;
      }
      
    }
    
  }  
  cerrarModal() {
    this.viewCtrl.dismiss( this.user );
  }

  crearUsuario() {
    console.log( "Punto de control" );
    console.log( this.user );
   // this.crear_post();
   if ( this.user.email === undefined ){
    this.user.email = this.aux;
   }
   console.log( "Segundo Punto de control" );
    console.log( this.user );
    if ( this.imgpreview === "" ){
      console.log("Es nulo");
      this.user.imagen = "";
    }else {
     
    this.user.imagen = this.imgpreview;
    //this.user.imagen = this.img64;
    }
    console.log( this.user );
    if ( this.editar === false ){
    this._us.nuevoUsuario( this.user ).then( (resp:any) =>{
       if (resp.token) {
         this.navCtrl.push( NuevoHomePage, { user: this.user} );
       } 
    });
      
  }else{
    this._us.editarUsuario( this.user ).then( (resp:any) =>{
      if (resp.token) {
        this.navCtrl.push( NuevoHomePage, { user: this.user} );
      } 
   });
  }  
   // this.navCtrl.popToRoot( );
    
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

  chapel(){
    let modal1 = this.modalCtrl.create( SearchChapelPage , { data: this.user.zip});
      modal1.onDidDismiss( dato => {
        console.log( dato );
        if ( dato !== null ) {
          this.chap = dato;
          this.user.church = this.chap.idChapel;
        } 
        
      })
      modal1.present();
}


}
