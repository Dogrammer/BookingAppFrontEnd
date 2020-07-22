import { Component, OnInit } from '@angular/core';
import { ApartmentGroupService } from '../services/apartment-group.service';
import { IApartmentGroup } from '../models/apartment-group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-group',
  templateUrl: './apartment-group.component.html',
  styleUrls: ['./apartment-group.component.scss']
})
export class ApartmentGroupComponent implements OnInit {

  apartmentGroups: IApartmentGroup[] = [];

  constructor(private apartmentGroupService: ApartmentGroupService, private router: Router) { }

  ngOnInit(): void {
    this.getApartmentGroups();
    console.log(this.apartmentGroups);
  }

  getApartmentGroups() {
    this.apartmentGroupService.getApartmentGroups().subscribe(
      data => { this.apartmentGroups = data; console.log(this.apartmentGroups)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/site/apartment-group/', id]);
  }

 

}
