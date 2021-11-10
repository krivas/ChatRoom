import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/Models/LoginResponse';
import { Observable } from 'rxjs/internal/Observable';

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
        return this.http.delete(`${environment.baseUrl}/${this.controller}/logout`);
      }

      isLoggedIn() {
        return this.http.get(`${environment.baseUrl}/${this.controller}/isLoggedIn`);
      }
    
    
}
