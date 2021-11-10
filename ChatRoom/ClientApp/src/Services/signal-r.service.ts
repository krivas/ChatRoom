import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  
import { Chat } from 'src/Models/Chat';
;

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  data: any;
  public messageReceived= new EventEmitter<Chat>();
  constructor() { 
    this.createConnection();
    this.startConnection();
    this.RegisterEvent();
    
  }
     
  private hubConnection: signalR.HubConnection;

  public createConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('chatHub',{
                              skipNegotiation:true,
                              transport:signalR.HttpTransportType.WebSockets,
                            })
                            .build();
    
  }

public startConnection=()=> {
    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));

}
  
  public RegisterEvent = () => {
    this.hubConnection.on("ReceiveMessage", (data) => {
      console.log("receiveMedda");
      console.log(data);
      this.messageReceived.emit(data);
    });
  }


  public send(username:string,message:string)
  {
   this.hubConnection.send("SendMessage", username, message)
        .then( ()=> console.log("mande mensaje") );
      }
}
