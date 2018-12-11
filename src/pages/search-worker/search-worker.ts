import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public works: OfferedProvider) {
                
   }           

  ionViewDidLoad() {
    this.works.cargar_todos();
   // console.log('ionViewDidLoad SearchWorkerPage');
  }

  filtraWork( ev: any ) {

    

    let valor = ev.target.value;
    console.log( valor );
    this.works.cargar_todos( valor )
        .then( ( resp ) => {
          if ( resp['skills'] ){
            this.skills = resp['skills'];

          } else {
            let respuesta = "Sorry, we don't know any " + valor + "yet.";
          }
          console.log( resp );
        })
   
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

}
