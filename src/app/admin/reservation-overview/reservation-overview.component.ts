import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/helpers/pagination';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { IReservation } from '../models/reservation';
import { ReservationParams } from '../models/reservationParams';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-overview',
  templateUrl: './reservation-overview.component.html',
  styleUrls: ['./reservation-overview.component.scss']
})
export class ReservationOverviewComponent implements OnInit {

  apartmentGroupForm: FormGroup = this.formBuilder.group({
    // userId: [null],
  });
  
  constructor(private reservationService: ReservationService,
              private ngbModalService: NgbModal,
              private toastr: ToastrService,
              private formBuilder: FormBuilder
    
            
    ) { }
    
  reservations: IReservation[] = [];
  pagination: Pagination;
  reservationParams:  ReservationParams = new ReservationParams;
  columns: any[] = [];

  ngOnInit(): void {
    this.getReservations();
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

  }

  getReservations() {
    this.reservationService.getReservationsORG(this.reservationParams, this.apartmentGroupForm.value).subscribe(
      data => { 
        this.reservations = data.result;
        this.pagination = data.pagination;
       }
    )
  }

  rejectReservation(id) {
    this.reservationService.rejectReservation(id).subscribe(
      data => { this.getReservations() ;
        this.toastr.info('Rezervacija je odbijena','Uspjeh');
              }
    )
  }

  acceptReservation(id) {
    this.reservationService.acceptReservation(id).subscribe(
      data => { this.getReservations();
        this.toastr.info('Rezervacija je prihvaćena','Uspjeh');

       }, error => {
         this.toastr.error('Rezervacija se ne može odbiti - kontaktirajte administratora', 'Upozorenje')
         
       }
    )
  }

  deleteReservation(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje rezervacije';
    modalRef.componentInstance.description = 'Želite li izbrisati rezervaciju?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.reservationService.deleteReservation(id).pipe(take(1)).subscribe(data => {
          this.toastr.info('Rezervacija je obrisana','Uspjeh');
          this.getReservations();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  pageChanged(event: any){
    this.reservationParams.pageNumber = event.page;
    this.getReservations();
  }

}
