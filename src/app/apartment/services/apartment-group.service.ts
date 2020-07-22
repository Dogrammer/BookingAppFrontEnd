import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartmentGroup } from '../models/apartment-group';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentGroupService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'ApartmentGroup';

  getApartmentGroups(): Observable<IApartmentGroup[]> {
    return this.http.get<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroups').pipe(
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
