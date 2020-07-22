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
      // this.alertify.success('Logged in successfully');
    }, error => {
      // this.alertify.error('Failed to login');
    }, () => {
      this.router.navigate(['/site/home']);
    });
  }

  loggedIn() {
    return this.authService.isAuthenticated();
  }

}
