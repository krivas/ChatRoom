import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalRService } from 'src/services/signal-r.service';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/Models/Chat';
import * as signalR from '@aspnet/signalr';
import { AuthService } from 'src/Services/Auth.service';
import { ChatHistoryService } from 'src/Services/chat-history.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class FetchDataComponent implements OnInit {
   chats: Chat[]=[];
   chat:Chat={user:null,message:null};
  
@ViewChild('form',{static:false}) form:NgForm;

  constructor(public signalRService: SignalRService,
    public authService:AuthService,
    public chatHistoryService:ChatHistoryService) {
   
  }
  ngOnInit(): void {
    this.getAllChats();
    this.createConnection();
    this.startConnection();
    this.RegisterEvent();
    this.chat.user= localStorage.getItem("username");
    
  }

  private hubConnection: signalR.HubConnection;

  public createConnection = () => {
    let httpOptions =new HttpHeaders().set('Authorization','Bearer ' + this.authService.getToken() );
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('chatHub',
                         {accessTokenFactory: ()=>{ return this.authService.getToken();}} as signalR.IHttpConnectionOptions)
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
  public getAllChats(){
    console.log("llamando getall chats..");
    this.chatHistoryService.getAll().subscribe(response=>{
     let chats= response.map((x)=>{
        return {user:x.userName,message:x.message}
      })
      this.chats=chats;
    });
     
    
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


