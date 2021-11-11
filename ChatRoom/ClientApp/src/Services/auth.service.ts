import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/Models/LoginResponse';
import { Observable } from 'rxjs/internal/Observable';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) { }
  controller:string='authenticate';

    login(formData) :Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.baseUrl}/${this.controller}`,formData,
            { responseType:'json' });
      }

      logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("username");
      }

      public SetTokenInfo(response:LoginResponse)  {
        localStorage.setItem("id_token",response.token);
        localStorage.setItem("expires_at",JSON.stringify(response.expires.valueOf()));
        localStorage.setItem("username",response.userName)
      }

      isLoggedIn() {
        return moment().isBefore(this.getExpiration());
      }

     public getToken() {
        return localStorage.getItem("id_token") ;
      }

     getExpiration(){
       const expiration=localStorage.getItem("expires_at");
       const expiresAt= JSON.parse(expiration);
       return  moment(expiresAt);
    }
    
}
