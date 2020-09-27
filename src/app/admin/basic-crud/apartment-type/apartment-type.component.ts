import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { IApartmentType } from '../../models/apartment-types';
import { ModalAoeApartmentTypeComponent } from '../modals/modal-aoe-apartment-type/modal-aoe-apartment-type.component';
import { BasicCrudService } from '../services/basic-crud.service';

@Component({
  selector: 'app-apartment-type',
  templateUrl: './apartment-type.component.html',
  styleUrls: ['./apartment-type.component.scss']
})
export class ApartmentTypeComponent implements OnInit {

  apartmentTypes: IApartmentType[] = [];
  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;


  constructor(
              private basicCrudService: BasicCrudService, 
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getApartmentTypes();
    console.log(this.apartmentTypes);
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

    
  }

  

     

  getApartmentTypes() {
    this.basicCrudService.getApartmentTypes().subscribe(
      data => { this.apartmentTypes = data; console.log(this.apartmentTypes)}
    )
  }

  deleteApartmentType(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje vrste apartmana';
    modalRef.componentInstance.description = 'Želite li izbrisati vrstu apartmana?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.basicCrudService.deleteApartmentType(id).pipe(take(1)).subscribe(data => {
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getApartmentTypes();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openAddApartmentTypeModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAoeApartmentTypeComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje vrste apartmana - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena vrste apartmana';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Dodaj vrstu apartmana';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getApartmentTypes();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getApartmentTypes();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getApartmentTypes();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

}
