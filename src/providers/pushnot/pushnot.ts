import { OneSignal } from '@ionic-native/onesignal';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';





@Injectable()
export class PushnotProvider {

  constructor(private oneSignal: OneSignal,
              private platform: Platform) {
    
  }

  init_notifications(){
    if ( this.platform.is('cordova')){
    this.oneSignal.startInit('7387dde9-6743-47fb-bb11-c110f6f4c7c6', '473038448469');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
});

this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

this.oneSignal.endInit();
  
} else {
  console.log('Esto no es OneSignal Compatible');
}

}

}
