import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApartmentFilterService {

  constructor(private http: HttpClient,
              private params: HttpParams        
      ) { }
}
