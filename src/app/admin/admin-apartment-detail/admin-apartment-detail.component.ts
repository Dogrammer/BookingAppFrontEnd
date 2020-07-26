import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IApartment } from 'src/app/apartment/models/apartment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminApartmentService } from '../services/admin-apartment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-apartment-detail',
  templateUrl: './admin-apartment-detail.component.html',
  styleUrls: ['./admin-apartment-detail.component.scss']
})
export class AdminApartmentDetailComponent implements OnInit {

  id: number;
  public model: NgbDateStruct;
  apartment: IApartment;
  images: Array<string> = [];

  reservationFormGroup: FormGroup = this.formBuilder.group({
    dateFrom: [null,Validators.required],
    dateTo: [null,Validators.required],
    apartmentId: [null],
    totalPrice: [null]
  });

  constructor(private adminApartmentDetailService: AdminApartmentService, 
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private ngbModalService: NgbModal) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getApartment(this.id);
    this.reservationFormGroup.patchValue({
      apartmentId: this.id,
      totalPrice: 150
    });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

  getApartment(id) {
    this.adminApartmentDetailService.getApartment(id).subscribe(
      data => { this.apartment = data; this.images = data.images; console.log(this.apartment)}
    )
  }

  // sendReservation()  {
  //   console.log('usao u komponentu');
  //   console.log(this.reservationFormGroup.value);
    
    
  //   if(!this.reservationFormGroup.valid) {
  //     console.log('forma nije dobra');
      
  //     return;
  //   } else {
  //     this.apartmentDetailService.sendReservation(this.reservationFormGroup.value).pipe(take(1)).subscribe(data => {
  //     });
  //   }
  // }

  // openReservationModal(row?) {
  //   const modalRef = this.ngbModalService.open(ModalReservationComponent, { size: 'lg', backdrop: 'static', keyboard: false});
  // }

}
