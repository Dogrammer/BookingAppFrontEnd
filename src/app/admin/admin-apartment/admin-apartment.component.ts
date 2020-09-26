import { Component, OnInit } from '@angular/core';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IApartment } from 'src/app/apartment/models/apartment';
import { AdminApartmentService } from '../services/admin-apartment.service';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-apartment',
  templateUrl: './admin-apartment.component.html',
  styleUrls: ['./admin-apartment.component.scss']
})
export class AdminApartmentComponent implements OnInit {

  apartments: IApartment[] = [];
  id: number;
  apartmentId;

  Message = "Parent to Child"
  

  constructor(private adminApartmentService: AdminApartmentService, 
              private activatedRoute: ActivatedRoute,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getApartmentById(this.id);


  }

  getApartmentById(id) {
    this.adminApartmentService.getApartmentById(id).subscribe(
      data => { this.apartments = data; console.log(this.apartments)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment/', id]);
  }

  addComponentNavigation() {
    this.router.navigate(['/admin/apartment/new-apartment']);
  }

  openPricingPeriodPage(id) {
    console.log(id);
    this.apartmentId = id;
    this.router.navigate(['/admin/apartment/', id, 'pricing-period-details']);
    
  }

  openImageUploadPage(id) {
    console.log(id);
    this.apartmentId = id;
    this.router.navigate(['/admin/apartment/', id,'images']);

    
  }

  deleteApartment(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje apartmana';
    modalRef.componentInstance.description = 'Želite li izbrisati apartman?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.adminApartmentService.deleteApartment(id).pipe(take(1)).subscribe(data => {
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getApartmentById(this.id);
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  openEditPage(id) {
    console.log(id);
    this.apartmentId = id;
    this.router.navigate(['/admin/apartment/',id,'edit-apartment']);

    
  }


}
