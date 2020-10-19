import { Component, OnInit } from '@angular/core';
import { ApartmentListService } from '../services/apartment-list.service';
import { IApartment } from '../models/apartment';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/helpers/pagination';
import { ApartmentParams } from 'src/app/admin/models/apartmentParams';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BasicCrudService } from 'src/app/admin/basic-crud/services/basic-crud.service';
import { ICity } from 'src/app/admin/models/city';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {

  apartments: IApartment[] = [];
  cities: ICity[] = [];
  pagination: Pagination;
  apartmentParams:  ApartmentParams = new ApartmentParams;
  apartmentForm: FormGroup = this.formBuilder.group({
    dateFrom: [null],
    dateTo: [null],
    cityId: [null],
    capacity: [null],
    // userId: [null],
  });

  constructor(private apartmentListService: ApartmentListService,
              private basicCrudService: BasicCrudService, 
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    // this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.getApartmentById(this.id);
    this.getApartments()
    this.getCities();
  }

  getApartments() {
    console.log('params:',this.apartmentParams);
    // this.spinnerService.show();
    this.apartmentListService.getApartmentsPagination(this.apartmentParams, this.apartmentForm.value).subscribe(
      data => {
         this.apartments = data.result;
         this.pagination = data.pagination;
        //  this.spinnerService.hide();
        })
  }

  navigateToDetails(id) {
    this.router.navigate(['/site/apartment/', id]);
  }

  public createImgPath = (serverPath: string) => {
    console.log(serverPath);
    
    return `https://localhost:5001/${serverPath}`;
  }

  pageChanged(event: any){
    this.apartmentParams.pageNumber = event.page;
    this.getApartments();
  }

  getCities() {
    this.basicCrudService.getCities().subscribe(
      data => {
        this.cities = data;
      }
    )
  }

  get dateTo(): AbstractControl {
    return this.apartmentForm.get('dateTo');
  }

  get dateFrom(): AbstractControl {
    return this.apartmentForm.get('dateFrom');
  }

  get capacity(): AbstractControl {
    return this.apartmentForm.get('capacity');
  }

  get cityId(): AbstractControl {
    return this.apartmentForm.get('cityId');
  }



}
