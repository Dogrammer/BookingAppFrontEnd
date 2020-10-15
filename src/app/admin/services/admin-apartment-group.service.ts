import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/helpers/pagination';
import { ApartmentGroupParams } from '../models/apartmentGroupParams';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentGroupService {

  

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'ApartmentGroup';

  getApartmentGroupsForAdminPagination(apartmentGroupParams: ApartmentGroupParams, filterData ) {
    
    let params = this.getPaginationHeaders(apartmentGroupParams.pageNumber, apartmentGroupParams.pageSize);
    console.log(filterData);
    
    if (filterData && filterData.userId > 0) {
      params = params.append('userId', filterData.userId.toString());
    }

    return this.getPaginatedResults<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroupsForAdmins', params);
  }

  private getPaginatedResults<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
    return params;
  }

  saveApartmentGroup(apartmentGroupData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/countries', apartmentGroupData).pipe(
      map( data => {
        return data
      })
    );
  }

  getApartmentGroupForAdmin(): Observable<IApartmentGroup[]> {
    return this.http.get<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroupsForAdmins').pipe(
      map( data => {
        return data
      })
    );
  }

  deleteApartmentGroup(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/deleteApartmentGroups/' + id).pipe(
      map( data => {
        return data
      })
    );
  }
}
