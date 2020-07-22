import { Component, OnInit } from '@angular/core';
import { ApartmentListService } from '../services/apartment-list.service';
import { IApartment } from '../models/apartment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {

  apartments: IApartment[] = [];
  id: number;

  constructor(private apartmentListService: ApartmentListService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getApartmentById(this.id);
  }

  getApartmentById(id) {
    this.apartmentListService.getApartmentById(id).subscribe(
      data => { this.apartments = data; console.log(this.apartments)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/site/apartment/', id]);
  }



}
