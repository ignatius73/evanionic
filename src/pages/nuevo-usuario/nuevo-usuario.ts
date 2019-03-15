import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Users2Provider } from '../../providers/users2/users2';
import { OauthProvider } from '../../providers/oauth/oauth';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SearchChapelPage } from '../search-chapel/search-chapel';
import { Chapel } from '../../interfaces/chapel.interface';
import { NuevoHomePage } from '../nuevo-home/nuevo-home';
import { NuevoUsuario2Page } from '../nuevo-usuario2/nuevo-usuario2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';





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
  myForm: FormGroup;
  passw: string;
  

  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              private camera: Camera,
              private picker: ImagePicker,
              public users2: Users2Provider,
              public oauth: OauthProvider,
              public _us: UsuarioProvider,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              public fb: FormBuilder
      
    ) {
      if ( this.navParams.data.user ){
        console.log("En el didLoad tengo User");
        this.editar = true;
        this.user = this.navParams.data.user;
        console.log("Voy a imprimir el user");
        console.log(this.user);
        this.user.imagen = this.navParams.data.user.imagen;
        }
      console.log("Editar " + this.editar);
      if( !this.editar ){
        console.log("Entro a validación con email");
        this.myForm = new FormGroup({
          'name': new FormControl(this.user.name, [Validators.required]),
          'surname': new FormControl(this.user.surname, [Validators.required]),
          'email': new FormControl(this.user.email,  
            [Validators.required,
            Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")], this.chequeoEmail.bind( this )),
          'password': new FormControl( this.user.password, [Validators.required]),
          'password1': new FormControl( this.passw, [Validators.required], this.confirmaPass.bind( this )),
          'age': new FormControl( this.user.age, [Validators.required] ),
          'celular': new FormControl( this.user.celular, [Validators.required] ),
          'address': new FormControl( this.user.address, [Validators.required] ),
          'city': new FormControl( this.user.city, [Validators.required] ),
          'state': new FormControl( this.user.state, [Validators.required] ),
          'zip': new FormControl( this.user.zip, [Validators.required] )
       //   'imagen': new FormControl( this.user.imagen )
        })

      }else{
        console.log("Entro a validación sin email");
        this.myForm = new FormGroup({
          'name': new FormControl(this.user.name, [Validators.required]),
          'surname': new FormControl(this.user.surname, [Validators.required]),
          'email': new FormControl(this.user.email),
          'age': new FormControl( this.user.age, [Validators.required] ),
          'celular': new FormControl( this.user.celular, [Validators.required] ),
          'address': new FormControl( this.user.address, [Validators.required] ),
          'city': new FormControl( this.user.city, [Validators.required] ),
          'state': new FormControl( this.user.state, [Validators.required] ),
          'zip': new FormControl( this.user.zip, [Validators.required] )
         // 'imagen': new FormControl( this.user.imagen )
        })
      }
      
  }
  ionWillDidLoad(){
    console.log("Imprimo en el ionWillLoad");
  }
  ionViewWillEnter(){
    
      
    }
  

    
  
  cerrarModal() {
    this.viewCtrl.dismiss( this.user );
  }

  crearUsuario() {
      
   
      this.navCtrl.push( NuevoUsuario2Page , { user: this.user, editar: this.editar });
        
  
    
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
          this.user.church = this.chap.idChurch;
        } 
        
      })
      modal1.present();
}

chequeoEmail( control: FormControl):Promise<any>{
  console.log("Entro a ChequeoEmail");
  let promise = new Promise( (resolve, reject) => {

    
    this._us.existeUsuario( this.user )

        .then( (data) => {
          console.log("Existe el usuario?");

          if ( data === true ){
            console.log(data);
            resolve( { existe: true } );
          }else{
            console.log(data);
            resolve( null );
          }
          
        } )
        .catch( (err) => {
          console.log("El resultado es " + err);
        })
 
    
    
  })
  console.log(this.myForm);
  console.log("En el provider ");
return promise;
}

confirmaPass( control: FormControl):Promise<any>{
  let promise = new Promise( ( resolve, reject ) => {
      if (this.user.password.length === this.passw.length){
          if( this.user.password === this.passw){
            resolve( null );

          }
          resolve({ iguales: "son distintos"});
            
      }else {
            resolve( { existe: true });
      }
  });
  return promise;
}




}
