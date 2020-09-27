import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/auth/models/user';
import { environment } from 'src/environments/environment';
import { IApartmentType } from '../../models/apartment-types';
import { ICity } from '../../models/city';
import { ICountry } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService {

  private readonly APARTMENT_TYPE_CONTROLLER = 'ApartmentType';
  private readonly USER_CONTROLLER = 'Auth';
  private readonly CITY_CONTROLLER = 'City';
  private readonly COUNTRY_CONTROLLER = 'Country';

  constructor(private http: HttpClient) { }

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(environment.apiUrl + this.CITY_CONTROLLER + '/getCities').pipe(
      map( data => {
        return data
      })
    );
  }

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(environment.apiUrl + this.COUNTRY_CONTROLLER + '/getCountries').pipe(
      map( data => {
        return data
      })
    );
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiUrl + this.USER_CONTROLLER + '/getUsers').pipe(
      map( data => {
        return data
      })
    );
  }

  getApartmentTypes(): Observable<IApartmentType[]> {
    return this.http.get<IApartmentType[]>(environment.apiUrl + this.APARTMENT_TYPE_CONTROLLER + '/getApartmentTypes').pipe(
      map( data => {
        return data
      })
    );
  }

  saveApartmentType(apartmentTypeData) {
    return this.http.post(environment.apiUrl + this.APARTMENT_TYPE_CONTROLLER + '/apartmentTypes', apartmentTypeData).pipe(
      map( data => {
        return data
      })
    );
  }

  saveCity(cityData) {
    return this.http.post(environment.apiUrl + this.CITY_CONTROLLER + '/cities', cityData).pipe(
      map( data => {
        return data
      })
    );
  }

  saveCountry(countryData) {
    return this.http.post(environment.apiUrl + this.COUNTRY_CONTROLLER + '/countries', countryData).pipe(
      map( data => {
        return data
      })
    );
  }

  saveUser(userData) {
    return this.http.post(environment.apiUrl + this.USER_CONTROLLER + '/users', userData).pipe(
      map( data => {
        return data
      })
    );
  }

  editApartmentType(id, apartmentTypeData) {
    return this.http.put(environment.apiUrl + this.APARTMENT_TYPE_CONTROLLER + '/editApartmentType/' + id, apartmentTypeData).pipe(
      map( data => {
        return data
      })
    );
  }

  editCity(id, cityData) {
    return this.http.put(environment.apiUrl + this.CITY_CONTROLLER + '/editCity/' + id, cityData).pipe(
      map( data => {
        return data
      })
    );
  }

  editCountry(id, countryData) {
    return this.http.put(environment.apiUrl + this.COUNTRY_CONTROLLER + '/editCountry/' + id, countryData).pipe(
      map( data => {
        return data
      })
    );
  }

  editUser(id, userData) {
    return this.http.put(environment.apiUrl + this.USER_CONTROLLER + '/editUser/' + id, userData).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteApartmentType(id) {
    return this.http.delete(environment.apiUrl + this.APARTMENT_TYPE_CONTROLLER + '/deleteApartmentType/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteCity(id) {
    return this.http.delete(environment.apiUrl + this.CITY_CONTROLLER + '/deleteCity/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteCountry(id) {
    return this.http.delete(environment.apiUrl + this.COUNTRY_CONTROLLER + '/deleteCountry/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteUser(id) {
    return this.http.delete(environment.apiUrl + this.USER_CONTROLLER + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }
}
