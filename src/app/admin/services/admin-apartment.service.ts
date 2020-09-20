import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartment } from 'src/app/apartment/models/apartment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentService {

  constructor(private http: HttpClient) { }

  private readonly APARTMENT_CONTROLER = 'Apartment';
  private readonly APARTMENT_TYPE_CONTROLER = 'ApartmentType';

  getApartmentById(id): Observable<IApartment[]> {
    return this.http.get<IApartment[]>(environment.apiUrl + this.APARTMENT_CONTROLER + '/getApartmentByApartmentGroupIdForAdmins/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getApartment(id): Observable<IApartment> {
    return this.http.get<IApartment>(environment.apiUrl + this.APARTMENT_CONTROLER + '/getApartmentForAdmin/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getApartmentTypes() {
    return this.http.get(environment.apiUrl + this.APARTMENT_TYPE_CONTROLER + '/getApartmentTypes').pipe(
      map( data => {
        return data
      })
    );
  }

  // getPricingPerio() {
  //   return this.http.get(environment.apiUrl + this.APARTMENT_TYPE_CONTROLER + '/getApartmentTypes').pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // saveCountry(countryData) {
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/countries', countryData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // editCountry(id, countryData) {
  //   return this.http.put(environment.apiUrl + this.CONTROLER_NAME + '/' + id, countryData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // deleteCountry(id) {
  //   return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }
}
