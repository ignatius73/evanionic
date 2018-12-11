import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { User } from '../../interfaces/user.interface';
import { Login } from '../../interfaces/login.interface';

import { AlertController, GESTURE_REFRESHER, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { storage } from 'firebase';
/*
  Generated class for the OfferedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfferedProvider {
  pagina:number = 0;
  skills:any[] = [];
  respuesta: string;

  constructor(public http: HttpClient) {
    console.log('Hello OfferedProvider Provider');
  }


  cargar_todos( term = 0){
    this.skills = [];
    let url = "";
    if ( term === 0 ){
      console.log( "Term está vacío");
      url = URL_SERVICIOS + "Skills/todos/" + this.pagina;
    } else {
    
      console.log( "Term está lleno");
      url = URL_SERVICIOS + "Skills/todosWhere/" + term;
    }

    return new Promise(  (resolve, reject)=>{

     // let url = URL_SERVICIOS + "/Skills/todos/" + this.pagina;

      this.http.get( url )
                
                .subscribe( data =>{
                  this.respuesta = undefined;


                  if( data['error'] === true ){
                    reject( data['error']);// Aqui hay un problema
                  }else{

                    //let nuevaData = this.agrupar( data.skills, 2 );
                    if ( data['respuesta'] ){
                      this.respuesta = data['respuesta'];
                    }
                    this.skills.push( ...data['skills'] );
                    this.pagina +=1;
                    console.log( this.skills );

                  }

                  resolve( data );

                })

    });

  }

  private agrupar( arr:any, tamano:number ){

    let nuevoArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }
    console.log( nuevoArreglo );
    return nuevoArreglo;

  }

  agrega_skills_user( email, hab ){
    
    let data = { 'email': email,
                  'habilidades' : hab };
    console.log(data);
    return new Promise(  (resolve, reject)=>{

      let url = URL_SERVICIOS + "/Skills/agrega_skills" ;

      this.http.post( url, data  )
                
                .subscribe( dato =>{
                  if( dato['error'] ){
                    reject( dato['error']);// Aqui hay un problema
                  }

                  resolve();

                })

    });

  }

  cargar_todas_skills( term = 0){
    this.skills = [];
    let url = "";
    if ( term === 0 ){
      console.log( "Term está vacío");
      url = URL_SERVICIOS + "Skills/todos/" + this.pagina;
    } else {
    
      console.log( "Term está lleno");
      url = URL_SERVICIOS + "Skills/todasSkillsWhere/" + term;
    }

    return new Promise(  (resolve, reject)=>{

     // let url = URL_SERVICIOS + "/Skills/todos/" + this.pagina;

      this.http.get( url )
                
                .subscribe( data =>{
                  this.respuesta = undefined;


                  if( data['error'] === true ){
                    reject( data['error']);// Aqui hay un problema
                  }else{

                    //let nuevaData = this.agrupar( data.skills, 2 );
                    if ( data['respuesta'] ){
                      this.respuesta = data['respuesta'];
                    }
                    this.skills.push( ...data['skills'] );
                    this.pagina +=1;
                    console.log( this.skills );

                  }

                  resolve( data );

                })

    });

  }




}