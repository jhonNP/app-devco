import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='https://identitytoolkit.googleapis.com/v1/accounts:';

  private apikey='AIzaSyCgG_vnOY3K4r5qX1FD80uRJtTh8dHO2SU';

  private userToken :String ='';
  //create user
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //iniciar sesion
//  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http: HttpClient) {

    this.leerToken();
  }

  logaut(){
     localStorage.removeItem('token');
     this.userToken='';
  }

  logIn(user: UsuarioModel){

    const authUser={
      ...user,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
        authUser
    ).pipe(
      map(( (res:any) =>{
          this.guardarToken(res['idToken']);
          return res;
      })
    ));

  }

  register(user: UsuarioModel){

    const authUser={
      ...user,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
        authUser
    ).pipe(
      map(( (res:any) =>{
          this.guardarToken(res['idToken']);
          return res;
      })
    ));

  }

  guardarToken(idToken: string){
      this.userToken=idToken;
      localStorage.setItem('token',idToken);
  }

  leerToken(){

    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token')+'';
    }else{
      this.userToken='';
    }

    this.userToken;
  }


  isAuthenticated(): boolean{
    return this.userToken.length>2;
  }

  redirectIfIdentity(_router:Router){
    let identity = this.isAuthenticated();
    if(identity){
        _router.navigate(["/"]);
    }
}
}
