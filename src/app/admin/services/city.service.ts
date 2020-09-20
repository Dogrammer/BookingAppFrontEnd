import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICity } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  private readonly CITY_CONTROLER = 'City';

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(environment.apiUrl + this.CITY_CONTROLER + '/getCities').pipe(
      map( data => {
        return data
      })
    );
  }
}
