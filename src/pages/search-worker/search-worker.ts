import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';
import { TrabajadorProvider } from '../../providers/trabajador/trabajador';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';



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
  arr_workers: any[] = [];
  selected: boolean = false;
  item: any = {};
  valoracion = 3;
  catsel: boolean;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public works: OfferedProvider,
              private loading: LoadingController,
              private alert: AlertController,
              public workers: TrabajadorProvider,
              private usuario: UsuarioProvider) {
                console.log("Entro a SearchWorker");
                console.log(this.usuario.us.length);
                if ( this.usuario.us.length === 0 ){
                  this.navCtrl.setRoot(LoginPage);
                }
                this.selected = false;
                
   }           

  ionViewDidLoad() {
    this.catsel = false;
   
    this.workers.getAllWorkers( 0 );

   // console.log('ionViewDidLoad SearchWorkerPage');
  }

  filtraWork( ev: any ) {
    this.term = ev
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
    this.workers.getWorkersBy( valor )
    .then( ( resp ) => {
      console.log(resp);
      loader.dismiss();
      if ( this.workers.workersFilter.length > 0 ){
        this.arr_workers = this.workers.workersFilter;

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

  contratar( worker ){
      

    const alert = this.alert.create({
      title: 'Congratulations!',
      subTitle: `You was contracted to ${ worker.name } ${ worker.surname}`,
      buttons: ['OK']
    });
    alert.present();
  
  }

  sendMessage( worker ){

  }

  iniciarChat( worker ){
    this.navCtrl.setRoot( 'ChatPage', { worker: worker, me: this.usuario.us[0]});
  }


}
