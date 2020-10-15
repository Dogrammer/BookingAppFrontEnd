import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/helpers/pagination';
import { environment } from 'src/environments/environment';
import { IReservation } from '../models/reservation';
import { ReservationParams } from '../models/reservationParams';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly CONTROLER_NAME = 'Reservation';

  constructor(private http: HttpClient) { }

  getReservations() : Observable<IReservation[]> {
    return this.http.get<IReservation[]>(environment.apiUrl + this.CONTROLER_NAME + '/getReservationsForAdmin').pipe(
      map( data => {
        return data
      })
    );
  }

  getReservationsORG(reservationParams: ReservationParams, filterData ) {
    
    let params = this.getPaginationHeaders(reservationParams.pageNumber, reservationParams.pageSize);
    console.log(filterData);
    
    // if (filterData && filterData.userId > 0) {
    //   params = params.append('userId', filterData.userId.toString());
    // }

    return this.getPaginatedResults<IReservation[]>(environment.apiUrl + this.CONTROLER_NAME + '/getReservationsForAdmin', params);
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



  rejectReservation(id: number) {
    return this.http.get(environment.apiUrl + this.CONTROLER_NAME + '/rejectReservation/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  acceptReservation(id: number) {
    return this.http.get(environment.apiUrl + this.CONTROLER_NAME + '/acceptReservation/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteReservation(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/deleteReservation/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  saveReservation(reservationData) {
    console.log(reservationData);
    
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/reservations', reservationData ).pipe(
      map( data => {
        return data
      })
    );
  }

  // rejectReservation
}
