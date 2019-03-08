import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { OauthProvider } from '../providers/oauth/oauth';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule,  } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NuevoUsuario2Page } from '../pages/nuevo-usuario2/nuevo-usuario2';
import { PortadaPage } from '../pages/portada/portada';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { SearchWorkerPage } from '../pages/search-worker/search-worker';
import { OfferPage } from '../pages/offer/offer';
import { IonicStorageModule } from '@ionic/storage';
import { NuevoHomePage } from '../pages/nuevo-home/nuevo-home';
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
import { CobraServicioPage } from '../pages/cobraservicio/cobraservicio';
import { Stripe } from '@ionic-native/stripe';
import { OneSignal } from '@ionic-native/onesignal';
import { ChatPage } from '../pages/chat/chat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';








import { PipesModule } from '../pipes/pipes.module';


// import { UsersProvider } from '../providers/users/users';
import { DonarPage } from '../pages/donar/donar';
import { TrabajadorProvider } from '../providers/trabajador/trabajador';
import { PushnotProvider } from '../providers/pushnot/pushnot';
//import { AmountPipe } from '../pipes/amount/amount';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { ChatsProvider } from '../providers/chats/chats';
import { OneSignalApiProvider } from '../providers/one-signal-api/one-signal-api';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ChatroomPageModule } from '../pages/chatroom/chatroom.module';
import { CerrarPageModule } from '../pages/cerrar/cerrar.module';
import { CerrarPage } from '../pages/cerrar/cerrar';
import {MuestraMensajePageModule } from '../pages/muestra-mensaje/muestra-mensaje.module';


//const urlsocket = 'http://localhost:3000'
const urlsocket = 'https://cincionichat.herokuapp.com'
const config: SocketIoConfig = { url: urlsocket, options: {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 99999
} };
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
    CobraServicioPage,
    DonarPage

 
    
   
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PipesModule,
    ChatPageModule,
    ChatroomPageModule,
    CerrarPageModule,
    FormsModule,
    ReactiveFormsModule,
    MuestraMensajePageModule
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    CobraServicioPage,
    DonarPage,
    ChatPage,
    ChatroomPage,
    CerrarPage
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OauthProvider,
    AngularFireDatabase,
    Facebook,
    GooglePlus,
    Camera,
    ImagePicker,
    CargaArchivoProvider,
    Users2Provider,
    UsuarioProvider,
    OfferedProvider,
    Stripe,
    TrabajadorProvider,
    PushnotProvider,
    ChatsProvider,
    OneSignal,
    OneSignalApiProvider
   
    

  ]
})
export class AppModule {}
