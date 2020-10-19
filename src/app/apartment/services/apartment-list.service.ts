import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApartmentGroup } from '../models/apartment-group';
import { IApartment } from '../models/apartment';
import { PaginatedResult } from 'src/app/helpers/pagination';
import { ApartmentParams } from 'src/app/admin/models/apartmentParams';

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

  getApartmentsPagination(apartmentParams: ApartmentParams, filterData ) {
    
    let params = this.getPaginationHeaders(apartmentParams.pageNumber, apartmentParams.pageSize);
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

    return this.getPaginatedResults<IApartment[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentsPagination', params);
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
