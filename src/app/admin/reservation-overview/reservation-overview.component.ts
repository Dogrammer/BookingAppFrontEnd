import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { IReservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-overview',
  templateUrl: './reservation-overview.component.html',
  styleUrls: ['./reservation-overview.component.scss']
})
export class ReservationOverviewComponent implements OnInit {

  constructor(private reservationService: ReservationService,
              private ngbModalService: NgbModal,
    
            
    ) { }

  reservations: IReservation[] = [];
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
    this.reservationService.getReservations().subscribe(
      data => { this.reservations = data; console.log('reservations', this.reservations);
       }
    )
  }

  rejectReservation(id) {
    this.reservationService.rejectReservation(id).subscribe(
      data => { this.getReservations() ;
              }
    )
  }

  acceptReservation(id) {
    this.reservationService.acceptReservation(id).subscribe(
      data => { this.getReservations();
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
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getReservations();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

}
