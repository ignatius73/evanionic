import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../interfaces/user.interface';

/*
  Generated class for the Users2Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Users2Provider {

  private userListRef = this.db.list<User>('users');


  constructor(public db: AngularFireDatabase) {
    console.log('Hello Users2Provider Provider');
  }

  getUsuariosList() {
    return this.userListRef;

  }

  addUsuario( user: User ){
  
    return this.userListRef.push( user );

  }

}
