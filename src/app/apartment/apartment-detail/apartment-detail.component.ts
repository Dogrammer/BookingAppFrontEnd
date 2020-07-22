import { Component, OnInit, ViewChild } from '@angular/core';
import { ApartmentDetailService } from '../services/apartment-detail.service';
import { IApartment } from '../models/apartment';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalReservationComponent } from './modal-reservation/modal-reservation.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  
  id: number;
  public model: NgbDateStruct;
  apartment: IApartment;

  reservationFormGroup: FormGroup = this.formBuilder.group({
    dateFrom: [null,Validators.required],
    dateTo: [null,Validators.required],
    apartmentId: [null],
    totalPrice: [null]
  });

  constructor(private apartmentDetailService: ApartmentDetailService, 
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

  getApartment(id) {
    this.apartmentDetailService.getApartment(id).subscribe(
      data => { this.apartment = data; console.log(this.apartment)}
    )
  }

  sendReservation()  {
    console.log('usao u komponentu');
    console.log(this.reservationFormGroup.value);
    
    
    if(!this.reservationFormGroup.valid) {
      console.log('forma nije dobra');
      
      return;
    } else {
      this.apartmentDetailService.sendReservation(this.reservationFormGroup.value).pipe(take(1)).subscribe(data => {
      });
    }
  }

  openReservationModal(row?) {
    const modalRef = this.ngbModalService.open(ModalReservationComponent, { size: 'lg', backdrop: 'static', keyboard: false});
  }
}
