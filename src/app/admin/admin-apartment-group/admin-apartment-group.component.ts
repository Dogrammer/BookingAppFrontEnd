import { Component, OnInit } from '@angular/core';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-apartment-group',
  templateUrl: './admin-apartment-group.component.html',
  styleUrls: ['./admin-apartment-group.component.scss']
})
export class AdminApartmentGroupComponent implements OnInit {

  apartmentGroups: IApartmentGroup[] = [];

  constructor(private apartmentGroupService: AdminApartmentGroupService, private router: Router) { }

  ngOnInit(): void {
    this.getApartmentGroups();
    console.log(this.apartmentGroups);
  }

  getApartmentGroups() {
    this.apartmentGroupService.getApartmentGroupsForAdmin().subscribe(
      data => { this.apartmentGroups = data; console.log(this.apartmentGroups)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

}
