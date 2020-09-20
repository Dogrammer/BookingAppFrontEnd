import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentDetailService } from 'src/app/apartment/services/apartment-detail.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { AdminApartmentService } from '../services/admin-apartment.service';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';

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
  countries;
  cities;
  apartmentDetailGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    userId: [null],
    apartmentTypeId: [null, Validators.required],
    apartmentGroupId: [null, Validators.required],
    cityId: [null, Validators.required],
    countryId: [null, Validators.required],
    address: ['', Validators.required],
    size: [null],
    numberOfBedrooms: [null],
    climateControl: [null],
    capacity: [null],
    wifi: [null],
    kitchenTool: [null],
    bbqTools: [null],
    workSpace: [null],
    closestBeachDistance: [null],
    closestMarketDistance: [null]
    
  });
  constructor(
    public formBuilder: FormBuilder,
    private apartmentGroupService: ApartmentDetailService,
    private adminApartmentGroupService: AdminApartmentGroupService,
    private apartmentService: AdminApartmentService,
    private cityService: CityService,
    private countryService: CountryService,
    private authService: AuthService
  )
    
    {}

  ngOnInit() {
    this.getApartmentTypes();
    this.getApartmentGroups();
    this.getCities();
    this.getCountries();
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

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => { this.countries = data; console.log(this.countries)}
    )
  }

  getCities() {
    this.cityService.getCities().subscribe(
      data => { this.cities = data; console.log(this.cities)}
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

  get cityId(): AbstractControl {
    return this.apartmentDetailGroup.get('cityId');
  }

  get countryId(): AbstractControl {
    return this.apartmentDetailGroup.get('countryId');
  }

  get address(): AbstractControl {
    return this.apartmentDetailGroup.get('address');
  }

  get closestBeachDistance(): AbstractControl {
    return this.apartmentDetailGroup.get('closestBeachDistance');
  }

  get closestMarketDistance(): AbstractControl {
    return this.apartmentDetailGroup.get('closestMarketDistance');
  }

  get capacity(): AbstractControl {
    return this.apartmentDetailGroup.get('capacity');
  }

  // get capacity(): AbstractControl {
  //   return this.apartmentDetailGroup.get('capacity');
  // }

  // get capacity(): AbstractControl {
  //   return this.apartmentDetailGroup.get('capacity');
  // }

  // get capacity(): AbstractControl {
  //   return this.apartmentDetailGroup.get('capacity');
  // }

  

  

  // get description(): AbstractControl {
  //   return this.apartmentDetailGroup.get('description');
  // }

}
