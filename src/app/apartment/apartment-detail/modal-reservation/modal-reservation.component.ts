import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ReservationService } from 'src/app/admin/services/reservation.service';

@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.scss']
})
export class ModalReservationComponent implements OnInit {
  @Input() title;
  @Input() action;
  @Input() apartmentId;
  @Input() price;
  @Input() row;

  reservationGroup: FormGroup = this.formBuilder.group({
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
    price: [null],
    apartmentId: [null, Validators.required]
  });

  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private reservationService: ReservationService
  )
    {}

  ngOnInit() {
    console.log(this.apartmentId);
    // this.checkIfAdmin();
    if(this.apartmentId) {
      this.reservationGroup.patchValue({
        apartmentId: this.apartmentId
      });
    }

    // this.calculatePrice();

  }

  saveReservation()  {
      console.log('validna forma', this.row);
      let request = {
        'dateFrom' : this.row.dateFrom,
        'dateTo': this.row.dateTo,
        'totalPrice': this.price,
        'apartmentId': +this.apartmentId
      }
      this.reservationService.saveReservation(request).pipe(take(1)).subscribe(data => {
        this.modal.close('add')
      });
  }

  // calculatePrice(): number {
  //   if (this.dateFrom && this.dateTo){
  //     // dohvati po trenutnom datumu cijenu apartmana i pomnoži rezultat sa tom cijenom
  //     let dateNow = Date.now();
  //     console.log('datenow', dateNow);
      
  //     var price = this.calculateDiff(this.dateFrom, this.dateTo) * price
  //     console.log(price);
      
  //     return price;
  //   }
  //   return;
  // }

//   calculateDiff(dateFrom, dateTo){

//     return Math.floor((Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate()) - Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate()) ) /(1000 * 60 * 60 * 24));
// }

  get dateTo(): AbstractControl {
    return this.reservationGroup.get('dateTo');
  }

  get dateFrom(): AbstractControl {
    return this.reservationGroup.get('dateFrom');
  }

  // get countryId(): AbstractControl {
  //   return this.reservationGroup.get('countryId');
  // }

}
