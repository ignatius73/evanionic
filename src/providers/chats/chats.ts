import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';




/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatsProvider {
  private chatsCollection: AngularFirestoreCollection<Mensaje>;
  private query: any;

  public chats: Mensaje[] = [];

  constructor(public http: HttpClient,
              private af: AngularFirestore) {
    
  }

  cargarMensajesXSala( sala ){
    this.chatsCollection = this.af.collection<Mensaje>('chats', ref => ref.where('sala', '==', sala).orderBy('fecha', 'asc'));
 
    
    return this.chatsCollection.valueChanges()
                        .map( (mensajes: Mensaje[]) =>{
                                this.chats = mensajes;
                        })
                                  
                                            
  }

  addChat( mensaje ){
    console.log("Imprimo el mensaje como llega al Provider");
    console.log(mensaje);
    let msg:Mensaje = {
        nombre: mensaje.nombre,
        mensaje: mensaje.mensaje,
        sala: mensaje.sala,
        fecha: mensaje.fecha
    }
    console.log(msg);
    return this.chatsCollection.add(msg)
      .then( data => {
        console.log(data);
      })
      .catch( err => {
        console.log("Ocurrió un error " + err);
      })
    ;
  }

}
