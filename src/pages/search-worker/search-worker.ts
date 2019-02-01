import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';


/**
 * Generated class for the SearchWorkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-worker',
  templateUrl: 'search-worker.html',
})
export class SearchWorkerPage {
  term:string;
  skills: any[] = [];
  selected: boolean = false;
  item: any = {};
  valoracion = 3;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public works: OfferedProvider,
              private loading: LoadingController,
              private alert: AlertController) {
                
                
   }           

  ionViewDidLoad() {
    this.works.cargar_todos();
   // console.log('ionViewDidLoad SearchWorkerPage');
  }

  filtraWork( ev: any ) {

   this.skills = []; 
   this.works.skills = [];
   let valor = ev.target.value;
   // this.skills = this.works.skills.filter( skill=> skill.description === valor );
   // console.log( valor );
  //  console.log( this.skills );
  if (valor.length >=2 && valor !== undefined ) {
  let loader = this.loading.create({
      content: "Please wait...",
      duration: 3000
  })  ;
  loader.present().then( () => {
    this.works.cargar_todos( valor )
    .then( ( resp ) => {
      loader.dismiss();
      if ( resp['skills'] ){
        this.skills = resp['skills'];

      } else {
        let respuesta = "Sorry, we don't know any " + valor + "yet.";
        console.log(respuesta);
      }
      console.log( resp );
    })

   });
  
  }
  }

  buscaWorker( item ){
    this.item = item;
    this.selected = true;
    console.log(this.item);
  }

  positivo(){
    console.log( "Aprobados");
  }
  negativo(){
    console.log( "Desaprobados")

  }

  contratar(){
    const alert = this.alert.create({
      title: 'Not Yet!',
      subTitle: 'We are working on it! Coming soon!',
      buttons: ['OK']
    });
    alert.present();
  
  }

}
