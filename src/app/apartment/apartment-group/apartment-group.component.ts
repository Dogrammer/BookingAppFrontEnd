import { Component, OnInit } from '@angular/core';
import { ApartmentGroupService } from '../services/apartment-group.service';
import { IApartmentGroup } from '../models/apartment-group';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/helpers/pagination';
import { ApartmentGroupParams } from 'src/app/admin/models/apartmentGroupParams';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BasicCrudService } from 'src/app/admin/basic-crud/services/basic-crud.service';
import { ICity } from 'src/app/admin/models/city';

@Component({
  selector: 'app-apartment-group',
  templateUrl: './apartment-group.component.html',
  styleUrls: ['./apartment-group.component.scss']
})
export class ApartmentGroupComponent implements OnInit {

  apartmentGroups: IApartmentGroup[] = [];
  cities: ICity[] = [];
  pagination: Pagination;
  apartmentGroupParams:  ApartmentGroupParams = new ApartmentGroupParams;
  apartmentGroupForm: FormGroup = this.formBuilder.group({
    dateFrom: [null],
    dateTo: [null],
    cityId: [null],
    capacity: [null],
    // userId: [null],
  });

  constructor(private apartmentGroupService: ApartmentGroupService,
              private formBuilder: FormBuilder,
              private basicCrudService: BasicCrudService,
              private router: Router) { }

  ngOnInit(): void {
    this.getApartmentGroups();
    this.getCities();
    console.log(this.apartmentGroups);
  }

  getApartmentGroups() {
    console.log('params:',this.apartmentGroupParams);
    
    
    // this.spinnerService.show();
    this.apartmentGroupService.getApartmentGroupsPagination(this.apartmentGroupParams, this.apartmentGroupForm.value).subscribe(
      data => {
         this.apartmentGroups = data.result;
         this.pagination = data.pagination;
        //  this.spinnerService.hide();
        })
  }

  filter () {
    console.log(this.apartmentGroupForm.value);
    
  }

  

  navigateToDetails(id) {
    this.router.navigate(['/site/apartment-group/', id]);
  }

  pageChanged(event: any){
    this.apartmentGroupParams.pageNumber = event.page;
    this.getApartmentGroups();
  }

  getCities() {
    this.basicCrudService.getCities().subscribe(
      data => {
        this.cities = data;
      }
    )
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

  //upload 
  

  get dateTo(): AbstractControl {
    return this.apartmentGroupForm.get('dateTo');
  }

  get dateFrom(): AbstractControl {
    return this.apartmentGroupForm.get('dateFrom');
  }

  get capacity(): AbstractControl {
    return this.apartmentGroupForm.get('capacity');
  }

  get cityId(): AbstractControl {
    return this.apartmentGroupForm.get('cityId');
  }

 

}
