import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;
  // photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'Auth';

   register(registerData) {
     console.log('uso');
     console.log('register data', registerData);
     const request = {
       password: registerData.password,
       email: registerData.username,
       gender: 'male',
       role: 'role'
     }

     console.log(request);
     
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/Register', request).pipe(
      map( data => {
        return data
      })
    );
    
  }

  login(model: any) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/Login', model).pipe(map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            // localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            // this.currentUser = user.user;
          }
        })
      );
  }

  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // sendReservation(reservationData) {
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/reservations/', reservationData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }


}
