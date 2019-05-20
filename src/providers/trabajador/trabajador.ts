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
  console.log("Entro por getallworkers");
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

  let data = { "nombre": term
                 };
  console.log("Entro por getWorkersBy");
  return new Promise((resolve, reject) => {
    this.http.post(URL_SERVICIOS+'Workers/filtrados/', data)
      .subscribe( (data: any)  =>{
        console.log("Imprimo data que devuelve la busqueda filtrada");
            console.log(data);
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
