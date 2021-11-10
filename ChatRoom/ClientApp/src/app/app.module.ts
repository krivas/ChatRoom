import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent as LogInComponent } from './logIn/logIn.component';
import { FetchDataComponent as ChatComponent } from './chat/chat.component';
import { AuthActivator } from 'src/Services/auth-activator.service';
import { RegisterUserService } from 'src/Services/register-user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterComponent,
    LogInComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'Register', component: RegisterComponent, pathMatch: 'full' },
      { path: '', component: LogInComponent },
      { path: 'Chat', component: ChatComponent },
    ])
  ],
  providers: [RegisterUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//canActivate:[AuthActivator]