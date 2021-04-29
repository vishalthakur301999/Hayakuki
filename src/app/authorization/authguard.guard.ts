import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // tslint:disable-next-line:typedef
  constructor(private route: Router, private auth: AuthorizationService) {
  }
  // tslint:disable-next-line:typedef
  canActivate() {
    if (this.auth.loginStatus){
      return true;
    }
    else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
