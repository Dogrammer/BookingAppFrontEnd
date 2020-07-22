import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartment } from '../models/apartment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApartmentDetailService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME_APARTMENT = 'Apartment';
  private readonly CONTROLER_NAME_RESERVATION = 'Reservation';


  getApartment(id): Observable<IApartment> {
    return this.http.get<IApartment>(environment.apiUrl + this.CONTROLER_NAME_APARTMENT + '/getApartment/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  sendReservation(reservationData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/reservations/', reservationData).pipe(
      map( data => {
        return data
      })
    );
  }
}
