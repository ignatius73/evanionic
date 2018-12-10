import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';




import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public network: Network,
              public networkProvider: NetworkProvider,
              public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();

	       		// Offline event
			    this.events.subscribe('network:offline', () => {
			        alert('network:offline ==> '+this.network.type);    
			    });

			    // Online event
			    this.events.subscribe('network:online', () => {
			        alert('network:online ==> '+this.network.type);        
			    });
    });
  }
}

