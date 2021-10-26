import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './service/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (this.loginService.logein()) {
      return true;
    } else {
      this.loginService.loginOut();
      this.router.navigate(['']);
      return false;
    }
  }

}
