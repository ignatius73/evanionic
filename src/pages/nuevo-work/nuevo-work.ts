import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Works } from '../../interfaces/work.interface';
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker';
import { OfferedProvider } from '../../providers/offered/offered';
import { User } from '../../interfaces/user.interface';


/**
 * Generated class for the NuevoWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-work',
  templateUrl: 'nuevo-work.html',
})
export class NuevoWorkPage {
work : Works = {};
imgpreview: string = "";
img64: any;
works: Works[] = [];
user: User = {};
ruta: string = '../../assets/imgs/dory.png';



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private picker: ImagePicker,
              public offer: OfferedProvider,
              public viewCtrl: ViewController
              ) {
    console.log(this.navParams);
    this.work.idWork
    this.user  = this.navParams.data.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoWorkPage');
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

  crearMensaje(){
    
    console.log( this.user );
    console.log("Mensaje creado");
    console.log(this.work);
    console.log(this.navParams.data.worker);
    this.work.idWork = this.navParams.data.worker.idWork;
    console.log("Valor en Imgae");
    console.log( this.work.image )
    if( this.imgpreview === ""){
      this.work.image = this.ruta; 
      console.log( this.work.image );
    }else{
      this.work.image = this.imgpreview;
    }
    console.log( this.work.image );
    console.log(this.work);
    this.works.push( this.work );
    this.offer.agrega_skills_user( this.user.email, this.works )
      .then( data =>{

          this.viewCtrl.dismiss();
           
    
      });

    }
  }