import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartment } from '../models/apartment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPricingPeriodDetail } from 'src/app/admin/models/pricingPeriodDetails';

@Injectable({
  providedIn: 'root'
})
export class ApartmentDetailService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME_APARTMENT = 'Apartment';
  private readonly CONTROLER_NAME_RESERVATION = 'Reservation';
  private readonly CONTROLER_NAME_PRICING_PERIOD = 'PricingPeriodDetail';


  getApartment(id): Observable<IApartment> {
    return this.http.get<IApartment>(environment.apiUrl + this.CONTROLER_NAME_APARTMENT + '/getApartment/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  checkAvailability(checkAvailabilityData)  {
    console.log('usao', checkAvailabilityData);
    
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/checkAvailability', checkAvailabilityData).pipe(
      map( data => {
        return data
      })
    );
  }

  getCurrentPricingPeriod(apartmentId): Observable<IPricingPeriodDetail> {
    return this.http.get<IPricingPeriodDetail>(environment.apiUrl + this.CONTROLER_NAME_PRICING_PERIOD + '/getCurrentPricingPeriod/' + apartmentId).pipe(
      map( data => {
        return data
      })
    );
  }

  getPrice(priceData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/getPrice', priceData).pipe(
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
