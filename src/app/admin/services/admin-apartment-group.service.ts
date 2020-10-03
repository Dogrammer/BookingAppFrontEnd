import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/helpers/pagination';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentGroupService {

  paginatedResult: PaginatedResult<IApartmentGroup[]> = new PaginatedResult<IApartmentGroup[]>();

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'ApartmentGroup';

  getApartmentGroupsForAdmin(page?: number, itemsPerPage?: number ) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      console.log('page=',page);
      console.log('itemsPerPage=', itemsPerPage);
      
      
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this.http.get<IApartmentGroup[]>(environment.apiUrl + this.CONTROLER_NAME + '/getApartmentGroupsForAdmins', {observe: 'response', params}).pipe(
      map( response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return this.paginatedResult; 
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

  deleteApartmentGroup(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/deleteApartmentGroups/' + id).pipe(
      map( data => {
        return data
      })
    );
  }
}
