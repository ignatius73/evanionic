import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

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
  oficios:any[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello OfferedProvider Provider');
  }

  cargar_categorias(){
    let url = URL_SERVICIOS + "Skills/categorias";
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
                     
                     console.log( this.skills );
 
                   }
 
                   resolve( data );
 
                 })
 
     });
  }
  cargar_todos_get( term = 0){
    this.skills = [];
    let url = "";
    if ( term === 0 ){
      console.log( "Term está vacío");
      url = URL_SERVICIOS + "Skills/categorias/" + this.pagina;
    } else {
    
      console.log( "Term está lleno");
      url = URL_SERVICIOS + "Skills/categorias/" + term;
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

/*  private agrupar( arr:any, tamano:number ){

    let nuevoArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }
    console.log( nuevoArreglo );
    return nuevoArreglo;

  }*/

  agrega_skills_user( email, hab ){
    console.log("Entro a agrega_skills_user");
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
    //this.skills = [];
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
                  console.log(data);
                  this.respuesta = undefined;


                  if( data['error'] === true ){
                    reject( data['error']);// Aqui hay un problema
                  }else{

                    //let nuevaData = this.agrupar( data.skills, 2 );
                    if ( data['respuesta'] ){
                      this.respuesta = data['respuesta'];
                    }
                    this.oficios.push( ...data['skills'] );
                    this.pagina +=1;
                    console.log( this.oficios );

                  }

                  resolve( data );

                })

    });

  }




}
