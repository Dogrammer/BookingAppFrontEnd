import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApartmentDetailService } from 'src/app/apartment/services/apartment-detail.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { AdminApartmentService } from '../services/admin-apartment.service';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { UploadService } from '../services/upload.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-admin-apartment-form',
  templateUrl: './add-admin-apartment-form.component.html',
  styleUrls: ['./add-admin-apartment-form.component.scss']
})
export class AddAdminApartmentFormComponent implements OnInit {

  @Input() action;
  @Input() row;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

  // users: any[] =[];
  // isAdmin;
  
  apartmentTypes;
  apartmentGroups;
  countries;
  cities;
  apartmentDetails;
  id: number;

  apartmentDetailGroup: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private apartmentGroupService: ApartmentDetailService,
    private adminApartmentGroupService: AdminApartmentGroupService,
    private apartmentService: AdminApartmentService,
    private cityService: CityService,
    private countryService: CountryService,
    private location: Location,
    private authService: AuthService
  )
    
    {
    
    }

  ngOnInit() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id && this.id > 0) {
      this.apartmentService.getApartment(this.id).subscribe(
        data => { 
          this.apartmentDetailGroup.patchValue({
            name: data.name,
            description: data.description,
            apartmentTypeId: data.apartmentTypeId,
            apartmentGroupId: data.apartmentGroupId,
            cityId: data.city.id,
            countryId: data.city.country.id,
            address: data.fullAddress,
            size: data.size,
            numberOfBedrooms: data.numberOfBedrooms,
            climateControl: data.climateControl,
            capacity: data.capacity,
            wifi: data.wifi,
            kitchenTool: data.kitchenTool,
            bbqTools: data.bbqTools,
            workSpace: data.workSpace,
            sportTool: data.sportTool,
            closestBeachDistance: data.closestBeachDistance,
            closestMarketDistance: data.closestMarketDistance,
      
          })
         }
      )
    }
    

    this.apartmentDetailGroup= this.formBuilder.group({
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
      climateControl: [false],
      capacity: [null],
      wifi: [false],
      kitchenTool: [false],
      bbqTools: [false],
      workSpace: [false],
      sportTool: [false],
      closestBeachDistance: [null],
      closestMarketDistance: [null],
      // pricingPeriodDetails: this.formBuilder.array([
      //   this.addPricingPeriodDetailsFormGroup()
      // ])
      
    });
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


  addPricingPeriodDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      price: [null, Validators.required]
    });
  }


  createPricingPeriodDetails(): FormGroup {
    return this.formBuilder.group({
      dateTo: '',
      dateFrom: '',
      price: ''
    })
  }


  saveApartment()  {
    if(!this.apartmentDetailGroup.valid) {
      console.log('nije valid');
      
      return;
    } else {
      console.log('valid je');
      
      this.apartmentService.saveApartment(this.apartmentDetailGroup.value).pipe(take(1)).subscribe(data => {
        this.location.back();
      });
    }
  }

  editApartment()  {
    if(!this.apartmentDetailGroup.valid) {
      console.log('nije valid');
      
      return;
    } else {
      console.log('valid je');
      
      this.apartmentService.editApartment(this.apartmentDetailGroup.value, this.id).pipe(take(1)).subscribe(data => {
        this.location.back();
      });
    }
  }

  getApartmentTypes() {
    this.apartmentService.getApartmentTypes().subscribe(
      data => { this.apartmentTypes = data; console.log(this.apartmentTypes)}
    )
  }

  getApartmentForEdit() {
    this.apartmentService.getApartment(this.id).subscribe(
      data => { this.apartmentDetails = data; }
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

  get pricingPeriodDetailsControls() {
    return this.apartmentDetailGroup.get('pricingPeriodDetails')['controls'];
  }

  // addPricingPeriodDetail() {
  //   let pricingPeriodDetails = this.apartmentDetailGroup.get('pricingPeriodDetails') as FormArray;
  //   this.pricingPeriodDetailsControls.push(this.createPricingPeriodDetails());
  // }

  removePricingPeriodDetail(i: number) {
    (<FormArray>this.apartmentDetailGroup.get('pricingPeriodDetails')).removeAt(i);
    // this.apartmentDetailGroup.remove
    // this.pricingPeriodDetailsControls.r
 }

 addPricingPeriodDetails(): void {
  (<FormArray>this.apartmentDetailGroup.get('pricingPeriodDetails')).push(this.addPricingPeriodDetailsFormGroup());
  // (<FormArray>this.apartmentDetailGroup.get('pricingPeriodDetails')).push(this.addPricingPeriodDetailsFormGroup());
}

uploadFile(file) {  
  console.log('file: ',file);
  
  const formData = new FormData();  
  formData.append('file', file.data);  
  formData.append('apartmentId', '1');
  file.inProgress = true;  
  this.uploadService.upload(formData).pipe(  
    map(event => {  
      switch (event.type) {  
        case HttpEventType.UploadProgress:  
          file.progress = Math.round(event.loaded * 100 / event.total);  
          break;  
        case HttpEventType.Response:  
          return event;  
      }  
    }),  
    catchError((error: HttpErrorResponse) => {  
      file.inProgress = false;  
      return of(`${file.data.name} upload failed.`);  
    })).subscribe((event: any) => {  
      if (typeof (event) === 'object') {  
        console.log(event.body);  
      }  
    });  
}

private uploadFiles() {  
  this.fileUpload.nativeElement.value = '';  
  this.files.forEach(file => {  
    this.uploadFile(file);  
  });  
}

onClick() {  
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}

submit() {
  console.log('cijela forma:', this.apartmentDetailGroup.value);
  
  
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
