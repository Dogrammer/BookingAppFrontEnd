import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentDetailService } from 'src/app/apartment/services/apartment-detail.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { AdminApartmentService } from '../services/admin-apartment.service';

@Component({
  selector: 'app-add-admin-apartment-form',
  templateUrl: './add-admin-apartment-form.component.html',
  styleUrls: ['./add-admin-apartment-form.component.scss']
})
export class AddAdminApartmentFormComponent implements OnInit {

  @Input() action;
  @Input() row;

  // users: any[] =[];
  // isAdmin;

  apartmentTypes;
  apartmentGroups;
  apartmentDetailGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    userId: [null],
    apartmentTypeId: [null, Validators.required],
    apartmentGroupId: [null, Validators.required],
    size: [null],
    numberOfBedrooms: [null],
    climateControl: [null],

    
  });
  constructor(
    public formBuilder: FormBuilder,
    private apartmentGroupService: ApartmentDetailService,
    private adminApartmentGroupService: AdminApartmentGroupService,
    private apartmentService: AdminApartmentService,
    private authService: AuthService
  )
    
    {}

  ngOnInit() {
    this.getApartmentTypes();
    this.getApartmentGroups();
    console.log(this.row);

    this
    
    // this.checkIfAdmin();
    // this.getApartmentManagers();
    if(this.row) {
      this.apartmentDetailGroup.patchValue({
        name: this.row.name,
        description: this.row.description,
        
        // userId: this.row.user.id,
        // userName: this.row.user.userName
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
      

    }
  }

  getApartmentTypes() {
    this.apartmentService.getApartmentTypes().subscribe(
      data => { this.apartmentTypes = data; console.log(this.apartmentTypes)}
    )
  }

  getApartmentGroups() {
    this.adminApartmentGroupService.getApartmentGroupsForAdmin().subscribe(
      data => { this.apartmentGroups = data; console.log(this.apartmentGroups)}
    )
  }

  get name(): AbstractControl {
    return this.apartmentDetailGroup.get('name');
  }

  get description(): AbstractControl {
    return this.apartmentDetailGroup.get('description');
  }

  get apartmentTypeId(): AbstractControl {
    return this.apartmentDetailGroup.get('apartmentTypeId');
  }

  get apartmentGroupId(): AbstractControl {
    return this.apartmentDetailGroup.get('apartmentGroupId');
  }

  get size(): AbstractControl {
    return this.apartmentDetailGroup.get('size');
  }

  get numberOfBedrooms(): AbstractControl {
    return this.apartmentDetailGroup.get('numberOfBedrooms');
  }

  get climateControl(): AbstractControl {
    return this.apartmentDetailGroup.get('climateControl');
  }

  

  // get description(): AbstractControl {
  //   return this.apartmentDetailGroup.get('description');
  // }

}
