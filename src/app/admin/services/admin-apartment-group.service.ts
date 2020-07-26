import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentGroupService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'ApartmentGroup';

  getApartmentGroupsForAdmin(): Observable<IApartmentGroup[]> {
    return this.http.get<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroupsForAdmins').pipe(
      map( data => {
        return data
      })
    );
  }

  saveApartmentGroup(apartmentGroupData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/countries', apartmentGroupData).pipe(
      map( data => {
        return data
      })
    );
  }
}
