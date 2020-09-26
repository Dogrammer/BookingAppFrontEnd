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

  saveApartmentGroup(apartmentGroupData) {
    console.log(apartmentGroupData);
    
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/apartmentGroups', apartmentGroupData).pipe(
      map( data => {
        return data
      })
    );
  }

  editApartmentGroup(id, apartmentGroupData) {
    console.log('test');
    
    return this.http.put(environment.apiUrl + this.CONTROLER_NAME + '/editApartmentGroup/' + id, apartmentGroupData).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteApartmentGroup(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }
}
