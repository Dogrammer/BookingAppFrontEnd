import { Component, OnInit } from '@angular/core';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IApartment } from 'src/app/apartment/models/apartment';
import { AdminApartmentService } from '../services/admin-apartment.service';

@Component({
  selector: 'app-admin-apartment',
  templateUrl: './admin-apartment.component.html',
  styleUrls: ['./admin-apartment.component.scss']
})
export class AdminApartmentComponent implements OnInit {

  apartments: IApartment[] = [];
  id: number;

  constructor(private adminApartmentService: AdminApartmentService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getApartmentById(this.id);
  }

  getApartmentById(id) {
    this.adminApartmentService.getApartmentById(id).subscribe(
      data => { this.apartments = data; console.log(this.apartments)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/site/apartment/', id]);
  }


}
