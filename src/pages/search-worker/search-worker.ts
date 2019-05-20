import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Navbar } from 'ionic-angular';
import { OfferedProvider } from '../../providers/offered/offered';
import { TrabajadorProvider } from '../../providers/trabajador/trabajador';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';
import { SMS } from '@ionic-native/sms';



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
  @ViewChild(Navbar) navBar: Navbar;
  term:string;
  skills: any[] = [];
  arr_workers: any[] = [];
  selected: boolean = false;
  item: any = {};
  valoracion = 3;
  catsel: boolean;
  worker: any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public works: OfferedProvider,
              private loading: LoadingController,
              private alert: AlertController,
              public workers: TrabajadorProvider,
              private usuario: UsuarioProvider,
              private sms: SMS) {
                console.log("Entro a SearchWorker");
                console.log(this.usuario.us.length);
                if ( this.usuario.us.length === 0 ){
                  this.navCtrl.setRoot(LoginPage);
                }
                this.selected = false;
                
   }           

  ionViewDidLoad() {
    console.log("User en navParams " )
    console.log( this.navParams.data.user );
    console.log("Back en navParams " )
    console.log( this.navParams.data.back );
    if( this.selected === false ){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.setRoot( this.navParams.data.back.component, { user: this.navParams.data.user, back: this.navCtrl.getActive() });
     
   }
  }else{
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.selected=false;
     
   }
  }
    this.workers.getAllWorkers( ).then(() =>{
      console.log(this.workers.workers);
    });
    
   // console.log('ionViewDidLoad SearchWorkerPage');
  }

  filtraWork( ev: any ) {
  console.log(ev);
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
      
      if ( this.workers.workersFilter.length > 0 ){
        this.arr_workers = this.workers.workersFilter;

      } else {
        let respuesta = "Sorry, we don't know any " + valor + "yet.";
        console.log(respuesta);
      }
      console.log( resp );
      //loader.dismiss();
    })

   });
  

  }
  }

  buscaWorker( item ){
    console.log("Seleccione en buscaWorker mi trabajador");
    console.log(item);
    this.item = item;
    this.selected = true;
    console.log(this.item);
  }

  positivo(item){
    console.log(item);

   this.usuario.valorar( item, 1)
     .then( (data)=>{
       console.log("Imrpimo lo que devuelve valorar");
       console.log(data);

       console.log("Imrpimo el item dado");
       console.log(item);

       this.actualizoWorker(item);
     })
     .catch( (err) => {
       console.log("Ocurrio el error " + err);
     })

     

  
     
    

  }
  negativo(item ){
    this.usuario.valorar( item, -1)
     .then( (data )=>{
      this.actualizoWorker(item);
     })
     .catch( (err) => {
      console.log("Ocurrio el error " + err);
    })
  }

  contratar( worker ){
    this.worker = worker;
    this.sms.send( worker.celular, `Hola. Soy ${ this.usuario.us[0].name } y decidí contratarte a través de CinC`);
    this.usuario.contratar( worker , this.usuario.us[0])
      .then( ( data ) =>{
        console.log(data);
        const alert = this.alert.create({
          title: 'Congratulations!',
          subTitle: `Contrataste a ${ worker.name } ${ worker.surname} ${ data['mensaje'] }. El número de operación es ${ data['operacion']}`,
          buttons: ['OK']
        });
        alert.present();

      })
      .catch( (err) => {
        console.log("Ocurrió el error " + err);
      })
   
    
    
  }



  iniciarChat( worker ){
    this.navCtrl.setRoot( 'ChatPage', { worker: worker, me: this.usuario.us[0]});
  }

  doInfinite( e ){
    this.workers.getAllWorkers( )
      .then( () => {
        console.log('Async operation has ended');
        e.complete();
      })
  }

  actualizoWorker( item ){
    let it = {
      "id": item.id,
      "idUser": item.idUser
    }
    this.workers.getWorkersBy( it )
      .then( ( data ) => {
        this.item = data[0];
      })
  }


}
