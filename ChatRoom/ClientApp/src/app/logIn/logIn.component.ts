import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/Models/LoginUser';
import { RegisterUser } from 'src/Models/User';
import { AuthService } from 'src/Services/Auth.service';

@Component({
  selector: 'app-logIn-component',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent {

  user:LoginUser={email:null,password:null};
  @ViewChild('form',{static:false}) form:NgForm;
  errorsMessage:string;


constructor(private authService:AuthService,
  private route:Router){}

login()
{
  this.errorsMessage=null;
  let user:LoginUser={...this.user};
 
    if (this.form.valid)
    {
          this.authService.login(user).subscribe(response=>{
            if(response.code===0)
              this.errorsMessage=response.description; 
            else if (response.code===1)
              this.route.navigate(['/Chat']);
            
          })
     
    }
}
}
