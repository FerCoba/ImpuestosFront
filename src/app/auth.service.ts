import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login():Observable<any> {

    let configUrl = 'https://apppreprod.rentascordoba.gob.ar/WSRestAuth/api/auth/login'
    let username;
    let password;
    let headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'});
    let data= {
      username: 'holamundo',
      password: 'test1234'
    }
    return this.http.post (configUrl, data,{ headers: headers})
      
   }
}
