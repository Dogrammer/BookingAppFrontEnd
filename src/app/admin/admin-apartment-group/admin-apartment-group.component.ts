import { Component, OnInit } from '@angular/core';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddOrEditApartmentGroupComponent } from './modal-add-or-edit-apartment-group/modal-add-or-edit-apartment-group.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-admin-apartment-group',
  templateUrl: './admin-apartment-group.component.html',
  styleUrls: ['./admin-apartment-group.component.scss']
})
export class AdminApartmentGroupComponent implements OnInit {

  apartmentGroups: IApartmentGroup[] = [];

  constructor(private apartmentGroupService: AdminApartmentGroupService, 
              public dialog: MatDialog,
              private router: Router) { }

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

  
  openAddApartmentGroupModal(): void {
    const dialogRef = this.dialog.open(ModalAddOrEditApartmentGroupComponent, {
      width: '500px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
