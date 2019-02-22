import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OneSignalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OneSignalApiProvider {
  message:any;
  app_id: string = '7387dde9-6743-47fb-bb11-c110f6f4c7c6';
 
  
  constructor(public http: HttpClient) {
    console.log('Hello OneSignalApiProvider Provider');
  }

  sendMessage( message ){

  }

  createNotification( datos ){
    let message = {
      "app_id": this.app_id,
      "filters": [
        {"field": "tag", "key": "token", "relation": "=", "value": datos.to} 
       
      ],
      "data": {"datos": datos },
     // "contents": {"en": "English Message"},
      "template_id": '093f783d-e91a-4ef8-9c46-c0c9eac9274c'
    }

    let url = "https://onesignal.com/api/v1/notifications";

    return new Promise(( resolve, reject ) => {
        this.http.post( url, message, { headers: {"Content-Type": "application/json; charset=utf-8",
                                                "Authorization": "Basic YTY4NDM5M2MtM2MyZi00NWQ3LWE3NTUtYTY1NzY5NWM1ODZk"}})
          .subscribe( (data:any) =>{
              console.log(data);
            resolve(data)
            reject(data);
          })
    })
  }

  newMessage( datos ){
    let message = {
      "app_id": this.app_id,
      "filters": [
        {"field": "tag", "key": "token", "relation": "=", "value": datos.to} 
       
      ],
      "data": {"datos": datos },
     // "contents": {"en": "English Message"},
      "template_id": 'f93dd533-96dd-4e7b-b1b5-9364480980f2'
    }

    let url = "https://onesignal.com/api/v1/notifications";

    return new Promise(( resolve, reject ) => {
        this.http.post( url, message, { headers: {"Content-Type": "application/json; charset=utf-8",
                                                "Authorization": "Basic YTY4NDM5M2MtM2MyZi00NWQ3LWE3NTUtYTY1NzY5NWM1ODZk"}})
          .subscribe( (data:any) =>{
              console.log(data);
            resolve(data)
            reject(data);
          })
    })
  }

}
