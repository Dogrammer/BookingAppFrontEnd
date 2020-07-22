import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApartmentGroup } from '../models/apartment-group';
import { IApartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentListService {


  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'Apartment';

  getApartmentById(id): Observable<IApartment[]> {
    return this.http.get<IApartment[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentByApartmentGroupId/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

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
