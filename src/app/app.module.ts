import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OauthProvider } from '../providers/oauth/oauth';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { UsersProvider } from '../providers/users/users';
import { NuevoUsuario2Page } from '../pages/nuevo-usuario2/nuevo-usuario2';
import { PortadaPage } from '../pages/portada/portada';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { SearchWorkerPage } from '../pages/search-worker/search-worker';
import { OfferPage } from '../pages/offer/offer';
import { IonicStorageModule } from '@ionic/storage';
import { NuevoHomePage } from '../pages/nuevo-home/nuevo-home';
import { KeyPipe } from '../pipes/key/key';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { NuevoUsuarioPage } from '../pages/nuevo-usuario/nuevo-usuario';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpClientModule } from '@angular/common/http';
import { Users2Provider } from '../providers/users2/users2';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { SearchChapelPage } from '../pages/search-chapel/search-chapel';
import { OfferedProvider } from '../providers/offered/offered';
import { CentralMensajesPage } from '../pages/central-mensajes/central-mensajes';
import { Braintree } from '@ionic-native/braintree';
import { CobraServicioPage } from '../pages/cobraservicio/cobraservicio';
import { Stripe } from '@ionic-native/stripe';





// import { UsersProvider } from '../providers/users/users';



export const firebaseConfig = {
  apiKey: "AIzaSyDpOMgpCr6oPU1ljscWNUHjDsFgPwaWlAo",
  authDomain: "evanapp-77653.firebaseapp.com",
  databaseURL: "https://evanapp-77653.firebaseio.com",
  projectId: "evanapp-77653",
  storageBucket: "evanapp-77653.appspot.com",
  messagingSenderId: "473038448469"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NuevoUsuarioPage,
    KeyPipe,
    NuevoHomePage,
    SearchChapelPage,
    OfferPage,
    SearchWorkerPage,
    MensajesPage,
    PortadaPage,
    NuevoUsuario2Page,
    CentralMensajesPage,
    CobraServicioPage
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NuevoUsuarioPage,
    NuevoHomePage,
    SearchChapelPage,
    OfferPage,
    SearchWorkerPage,
    MensajesPage,
    PortadaPage,
    NuevoUsuario2Page,
    CentralMensajesPage,
    CobraServicioPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OauthProvider,
    AngularFireDatabase,
    Facebook,
    GooglePlus,
    UsersProvider,
    Camera,
    ImagePicker,
    CargaArchivoProvider,
    Users2Provider,
    UsuarioProvider,
    OfferedProvider,
    Braintree,
    Stripe
    

  ]
})
export class AppModule {}
