import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApartmentGroup } from '../models/apartment-group';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApartmentGroupParams } from 'src/app/admin/models/apartmentGroupParams';
import { PaginatedResult } from 'src/app/helpers/pagination';

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

  getApartmentGroupsPagination(apartmentGroupParams: ApartmentGroupParams, filterData ) {
    
    let params = this.getPaginationHeaders(apartmentGroupParams.pageNumber, apartmentGroupParams.pageSize);
    console.log(filterData);
    
    if (filterData && filterData.dateFrom != null) {
      params = params.append('dateFrom', filterData.dateFrom.toString());
    }
    if (filterData && filterData.dateTo != null) {
      params = params.append('dateTo', filterData.dateTo.toString());
    }
    if (filterData && filterData.capacity != null) {
      params = params.append('capacity', filterData.capacity.toString());
    }
    if (filterData && filterData.cityId != null) {
      params = params.append('cityId', filterData.cityId.toString());
    }

    return this.getPaginatedResults<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroupsPagination', params);
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
    return params;
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
