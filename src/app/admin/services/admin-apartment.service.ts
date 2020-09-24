import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartment } from 'src/app/apartment/models/apartment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPricingPeriodDetail } from '../models/pricingPeriodDetails';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentService {

  constructor(private http: HttpClient) { }

  private readonly APARTMENT_CONTROLER = 'Apartment';
  private readonly APARTMENT_TYPE_CONTROLER = 'ApartmentType';
  private readonly PRICING_PERIOD_DETAIL_CONTROLLER = 'PricingPeriodDetail';

  getApartmentById(id): Observable<IApartment[]> {
    return this.http.get<IApartment[]>(environment.apiUrl + this.APARTMENT_CONTROLER + '/getApartmentByApartmentGroupIdForAdmins/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getPricingPeriodDetailsByApartmentId(id): Observable<IPricingPeriodDetail[]> {
    return this.http.get<IPricingPeriodDetail[]>(environment.apiUrl + this.PRICING_PERIOD_DETAIL_CONTROLLER + '/getPricingPeriodDetailsForApartment/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getImagesByApartmentId(id) {
    return this.http.get(environment.apiUrl + this.APARTMENT_CONTROLER + '/getImagesForApartment/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getApartment(id): Observable<IApartment> {
    return this.http.get<IApartment>(environment.apiUrl + this.APARTMENT_CONTROLER + '/getApartmentForAdmin/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  getApartmentTypes() {
    return this.http.get(environment.apiUrl + this.APARTMENT_TYPE_CONTROLER + '/getApartmentTypes').pipe(
      map( data => {
        return data
      })
    );
  }

  saveApartment(apartmentData) {
    
    const request = {
      'address': apartmentData.address,
      'apartmentGroupId': apartmentData.apartmentGroupId,
      'apartmentTypeId': apartmentData.apartmentTypeId,
      'bbqTools': apartmentData.bbqTools,
      'capacity': apartmentData.capacity,
      'cityId': apartmentData.cityId,
      'climateControl': apartmentData.climateControl,
      'closestBeachDistance': apartmentData.closestBeachDistance,
      'closestMarketDistance' : apartmentData.closestMarketDistance,
      'countryId': apartmentData.countryId,
      'description': apartmentData.description,
      'kitchenTool': apartmentData.kitchenTool,
      'name': apartmentData.name,
      'numberOfBedrooms': apartmentData.numberOfBedrooms,
      'size': apartmentData.size,
      'workSpace': apartmentData.workSpace,
      'wifi': apartmentData.wifi
    }

    console.log('usao u servis: ',request);
    
    return this.http.post(environment.apiUrl + this.APARTMENT_CONTROLER + '/apartments', request).pipe(
      map( data => {
        return data
      })
    );
  }

  savePricingPeriodDetails(pricingPeriodDetailsData, apartmentId) {
    console.log('details', pricingPeriodDetailsData);
    
    const request = {
      'apartmentId': apartmentId,
      'pricingPeriodDetails': pricingPeriodDetailsData.pricingPeriodDetails
    }

    console.log(request);
    
    return this.http.post(environment.apiUrl + this.PRICING_PERIOD_DETAIL_CONTROLLER + '/pricingPeriodDetails', request).pipe(
      map( data => {
        return data
      })
    );
  }

  // getPricingPerio() {
  //   return this.http.get(environment.apiUrl + this.APARTMENT_TYPE_CONTROLER + '/getApartmentTypes').pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

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
