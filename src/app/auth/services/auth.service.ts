import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;
  currentUsername: string;
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
       role: 'role',
       wannabeManager: registerData.wannabeManager
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
            console.log(this.decodedToken);
            console.log(this.decodedToken.Username);
            
            this.currentUsername = this.decodedToken.Username;
            // this.currentUser.username = this.decodedToken.Username;
          }
        })
      );
  }

  logout() {
    return this.http.get(environment.apiUrl + this.CONTROLER_NAME + '/logout').pipe(
      map( data => {
        return data
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

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    var token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    if (!this.decodedToken){
      return;
    }
    console.log('prosao poslije ifa - nije dobro');
    
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  getApartmentManagers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiUrl + this.CONTROLER_NAME + '/getAllUsersWithApartmentManagerRole').pipe(
      map( data => {
        return data
      })
    );
  }

  checkIfAdmin() {
    return this.http.get(environment.apiUrl + this.CONTROLER_NAME + '/checkIfAdmin').pipe(
      map( data => {
        return data
      })
    );
  }


}
