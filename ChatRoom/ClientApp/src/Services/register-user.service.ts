import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationResponse } from 'src/Models/RegistrationResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  controller:string='register';

    public register(formData):Observable<RegistrationResponse> {
        return this.http.post<RegistrationResponse>(`${environment.baseUrl}/${this.controller}`,formData,
            { responseType: 'json' });
      }

     
    
}
