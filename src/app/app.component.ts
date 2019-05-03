import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PortadaPage } from '../pages/portada/portada';
import { NuevoHomePage } from '../pages/nuevo-home/nuevo-home';
import { SearchWorkerPage } from '../pages/search-worker/search-worker';
import { CentralMensajesPage } from '../pages/central-mensajes/central-mensajes';
import { PushnotProvider } from '../providers/pushnot/pushnot';
import { ChatPage } from '../pages/chat/chat';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CerrarPage } from '../pages/cerrar/cerrar';
import { RootPageProvider } from '../providers/root-page/root-page';
import { Observable } from 'rxjs/Observable';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage:any = PortadaPage;
  nuevohome=  NuevoHomePage;
  buscar= SearchWorkerPage;
  cartelera= CentralMensajesPage;
  chat=ChatPage;
  cerrar=CerrarPage;
  avisos$:Observable<any>;
  aviso:number = 0;
  backbutton:any;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private MenuCtrl: MenuController,
              public push: PushnotProvider,
              public usuario: UsuarioProvider

              
              ) {
                
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      statusBar.styleDefault();
      splashScreen.hide();
      this.push.init_notifications();
         
    })
  }

 /* ionViewDidLoad() {
    this.avisos$ = this.push.getMensajes$();
    this.avisos$.subscribe(msg => {
      console.log("iMPRIMI MSG");
      console.log(msg);
      this.aviso = msg
      
  });

}*/

  openPage( pag ){
    this.backbutton = this.nav.getActive();
   /* console.log("Imprimo el getActive");
    console.log(this.backbutton);*/
    this.nav.setRoot( pag, { back: this.backbutton } );
    this.MenuCtrl.toggle();
   /* console.log(pag);
    console.log(this.rootPage);
    console.log( typeof this.rootPage );
    
    
    if ( this.rootPage !== pag || pag === 'ChatPage') {
      this.rootPage = pag;
    }
    
    this.MenuCtrl.toggle();
 // }
  }*/
}
}

