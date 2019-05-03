import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';


/*
  Generated class for the TrabajadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrabajadorProvider {
pag:number = 0;
workers: any[];  
workersFilter: any[];
  constructor(public http: HttpClient) {
    console.log('Hello TrabajadorProvider Provider');
  }


getAllWorkers( ){
  return new Promise((resolve, reject) => {
    this.http.get(URL_SERVICIOS+'Workers/todos/'+ this.pag)
      .subscribe( (data: any)  =>{
            if( data['error']=== true ){
              reject( data['error']);
            }
            this.workers = [];
            this.workers.push( ...data['workers']); 
            this.pag +=1;
            resolve(this.workers);
               
            });
               
             });
              
}

getWorkersBy( term ){
  return new Promise((resolve, reject) => {
    this.http.post(URL_SERVICIOS+'Workers/filtrados/', term)
      .subscribe( (data: any)  =>{
            if( data['error']=== true ){
              reject( data['error']);
            }
            this.workersFilter = [];
            this.workersFilter.push( ...data['workers']); 
            
            resolve(this.workersFilter);
               
            });
               
             });
}
}
