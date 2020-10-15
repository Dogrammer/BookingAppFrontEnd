import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  registerFormGroup: FormGroup = this.formBuilder.group({
    username: [null],
    password: [null],
  });
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }


  register() {
    if (this.registerFormGroup.valid) {
      this.user = Object.assign({}, this.registerFormGroup.value); /* iz registerForm.value spremamo u empty object i to assignamo u var user; */
      this.authService.register(this.registerFormGroup.value).subscribe(() => {
        // this.alertify.success('Registration successful');
      }, error => {
        // this.alertify.error(error);
      }, () => {
        // this.authService.login(this.user).subscribe(() => {
        //   // this.router.navigate(['/members']);
        // });
      });
    }
  }

  navigateToLoginPage() {
    this.router.navigate(['auth/login']);
  }

}
