
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';



  


/*
  Generated class for the OauthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OauthProvider {
  usuario: User = {};

  constructor() {
    
  }

  cargarUsuario(  dname: string,
                  email: string,
                  imagen: string,
                  uid: string)
                   {

      this.usuario.name = dname;
      this.usuario.email = email;
      this.usuario.imagen = imagen;
      this.usuario.uid = uid;
      
    
  }

}





