import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.scss']
})
export class SiteNavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  navigateToLoginPage() {
    this.router.navigate(['auth/login'])
  }

  loggedIn() {
    if (this.authService.isAuthenticated()){
      return true;
    }

    return false;
  }

  logout() {
    this.authService.logout().subscribe( response => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.decodedToken = null;
      this.authService.currentUser = null;
      this.router.navigate(['site/home']);
    })
    
    // this.alertify.message('logged out');
    

  }

}
