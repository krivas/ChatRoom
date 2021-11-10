import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/Models/User';
import { RegisterUserService } from 'src/Services/register-user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

 errorsMessage:string;
 isSucessfull:boolean=false;
 user:RegisterUser={userName:null,email:null,password:null,confirmPassword:null};
@ViewChild('form',{static:false}) form:NgForm;

  constructor(private registerService:RegisterUserService,
    private route:Router) {}

register()
{
  this.errorsMessage=null;
  
  let user:RegisterUser={...this.user};
 
    if (this.form.valid)
    {
      console.log(user.confirmPassword);
      console.log(user.password);
      if (user.confirmPassword != user.password)
      {
          this.errorsMessage="Password and ConfirmPassword don't match";
          return;
      }
         this.registerService.register(user).subscribe(response=>{
            console.log(response);
            console.log("Description");
            console.log(response.code==0);
            console.log("Code");
            console.log(response.code ==1);
            if (response.code==0)
               this.errorsMessage=response.description;
            else if(response.code ==1)
            {
               this.isSucessfull=true;

               setTimeout(()=>{this.route.navigate(['/']);},3000);
            }

         });
  
    }
}

}

