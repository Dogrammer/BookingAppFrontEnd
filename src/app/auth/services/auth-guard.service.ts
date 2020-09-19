import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  // canActivate(): boolean {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['auth/login']);
  //     return false;
  //   }
  //   return true;
  // }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    console.log(next);
    
    const roles = next.data['roles'] as Array<string>;
    console.log('role canactivate', roles);
    
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if(match) {
        return true;

      } else {
        this.router.navigate(['site/home']);
        window.alert("You are not authorized to access this area");
      }
    }
    if (this.authService.isAuthenticated()) {
      return true;
    }
    window.alert("you shall not pass!!!");
    this.router.navigate(['site/home']);
    return false;
  }
}
