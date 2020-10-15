import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginFormGroup: FormGroup = this.formBuilder.group({
    email: [null],
    password: [null],
  });

  constructor(private authService: AuthService, 
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginFormGroup.value).subscribe(next => {
      console.log('logged in');
      
    }, error => {
      console.log(error);
    }, () => {
    let listOfRoles: Array<string> = ['Admin', 'ApartmentManager'];
      if ( this.authService.roleMatch(listOfRoles)) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['/site/home']);
      }
    });
  }

  loggedIn() {
    return this.authService.isAuthenticated();
  }

  navigateToRegisterPage(){
    this.router.navigate(['auth/register']);
  }

}
