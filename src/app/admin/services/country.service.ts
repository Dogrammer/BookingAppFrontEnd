import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICountry } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private readonly COUNTRY_CONTROLER = 'Country';

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(environment.apiUrl + this.COUNTRY_CONTROLER + '/getCountries').pipe(
      map( data => {
        return data
      })
    );
  }
}
