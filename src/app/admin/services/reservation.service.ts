import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReservation } from '../models/reservation';

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

  // rejectReservation
}
