import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
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





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any = PortadaPage; //LoginPage;
  nuevohome=  NuevoHomePage;
  buscar= SearchWorkerPage;
  cartelera= CentralMensajesPage;
  chat=ChatPage;
  cerrar=CerrarPage;
  

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

  openPage( pag:any){
    console.log(pag);
    console.log(this.rootPage);
    if ( this.rootPage !== pag || pag === 'ChatPage') {
      this.rootPage = pag;
    }
    this.MenuCtrl.toggle();
  }

}

