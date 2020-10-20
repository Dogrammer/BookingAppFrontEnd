import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IPricingPeriodDetail } from '../models/pricingPeriodDetails';
import { AdminApartmentService } from '../services/admin-apartment.service';

@Component({
  selector: 'app-admin-pricing-period-details',
  templateUrl: './admin-pricing-period-details.component.html',
  styleUrls: ['./admin-pricing-period-details.component.scss']
})
export class AdminPricingPeriodDetailsComponent implements OnInit {
  @Input() apartmentId: number;
  @Input() Message: string;

  id: number;
  pricingPeriodDetailGroup: FormGroup;
  pricingPeriodDetails: IPricingPeriodDetail[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminApartmentService: AdminApartmentService,
    private location: Location,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.pricingPeriodDetailGroup = this.formBuilder.group({
      pricingPeriodDetails: this.formBuilder.array([
        this.addPricingPeriodDetailsFormGroup()
      ])
    });

    this.adminApartmentService.getPricingPeriodDetailsByApartmentId(this.id).subscribe(
      data => { 
        this.pricingPeriodDetails = data;
        if (this.pricingPeriodDetails && this.pricingPeriodDetails.length > 0){
          this.pricingPeriodDetailGroup.setControl('pricingPeriodDetails', this.setExistingDetails(this.pricingPeriodDetails))
        }
      })
  }

  

  setExistingDetails(details: IPricingPeriodDetail[]) : FormArray { 
    console.log('uso u existing', details);
    
    const formArray = new FormArray([]);
    details.forEach(d => {
     formArray.push(this.formBuilder.group({
        name: d.name,
        dateTo: d.dateTo,
        dateFrom: d.dateFrom,
        price: d.price
      }));
    });
    return formArray;
  }
  
  

  addPricingPeriodDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  getPricingPeriodByApartmentId() {
    this.adminApartmentService.getPricingPeriodDetailsByApartmentId(this.id).subscribe(
      data => { this.pricingPeriodDetails = data;}
    )
  }

  savePricingPeriodDetails()  {
    if(!this.pricingPeriodDetailGroup.valid) {
      console.log('nije valid');
      
      return;
    } else {
      console.log('valid je');
      
      this.adminApartmentService.savePricingPeriodDetails(this.pricingPeriodDetailGroup.value, this.id).pipe(take(1)).subscribe(data => {
        // this.location.back();
        this.toastr.success('Spremili ste periode plaćanja', 'Uspjeh');
        this.location.back();
      });
    }
  }

  get pricingPeriodDetailsControls() {
    return this.pricingPeriodDetailGroup.get('pricingPeriodDetails')['controls'];
  }

  removePricingPeriodDetail(i: number) {
    (<FormArray>this.pricingPeriodDetailGroup.get('pricingPeriodDetails')).removeAt(i);
    // this.apartmentDetailGroup.remove
    // this.pricingPeriodDetailsControls.r
 }

 addPricingPeriodDetails(): void {
  (<FormArray>this.pricingPeriodDetailGroup.get('pricingPeriodDetails')).push(this.addPricingPeriodDetailsFormGroup());
  // (<FormArray>this.apartmentDetailGroup.get('pricingPeriodDetails')).push(this.addPricingPeriodDetailsFormGroup());
}

  // getApartmentById(id) {
  //   this.adminApartmentService.getApartmentById(id).subscribe(
  //     data => { this.apartments = data; console.log(this.apartments)}
  //   )
  // }

}
