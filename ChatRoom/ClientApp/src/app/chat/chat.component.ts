import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'src/services/signal-r.service';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/Models/Chat';
import * as signalR from '@aspnet/signalr';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class FetchDataComponent implements OnInit {
   chats: Chat[]=[];
   chat:Chat={user:null,message:null};
  
@ViewChild('form',{static:false}) form:NgForm;

  constructor(public signalRService: SignalRService) {
   
  }
  ngOnInit(): void {
    this.createConnection();
    this.startConnection();
    this.RegisterEvent();
  }

  private hubConnection: signalR.HubConnection;

  public createConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('chatHub')
                            .build();
    
  }

public startConnection=()=> {
    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));

}
  
  public RegisterEvent = () => {
    this.hubConnection.on("ReceiveMessage", (user,message) => {
      let chat:Chat={user:user,message:message};
      this.chats.push(chat);
    });
  }


  public sendServer(username:string,message:string)
  {
    this.hubConnection.invoke("SendMessage", username, message);
  }

  send():void {
    let chat:Chat={...this.chat};
 
    if (this.form.valid)
    {
      this.sendServer(chat.user,chat.message );
      this.form.reset();
    }

   
  }
}


