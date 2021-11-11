import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatHistoryResponse } from 'src/Models/ChatHistoryResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  constructor(private http: HttpClient) { }
  controller:string='chatHistory';

    getAll() :Observable<any[]> {
        return this.http.get<any[]>(`${environment.baseUrl}/${this.controller}`);
      }
}
