import { AuthService } from 'src/Services/Auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthActivator implements CanActivate {

  constructor(private router: Router,
    private authService:AuthService) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

       return this.authService.isLoggedIn();
    
  }
         
}

      
  
  
