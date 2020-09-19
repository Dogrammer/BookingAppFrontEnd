import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IApartmentGroup } from 'src/app/apartment/models/apartment-group';
import { AdminApartmentGroupService } from '../services/admin-apartment-group.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddOrEditApartmentGroupComponent } from './modal-add-or-edit-apartment-group/modal-add-or-edit-apartment-group.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-apartment-group',
  templateUrl: './admin-apartment-group.component.html',
  styleUrls: ['./admin-apartment-group.component.scss']
})
export class AdminApartmentGroupComponent implements OnInit {

  apartmentGroups: IApartmentGroup[] = [];
  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;

  

  ColumnMode = ColumnMode;


  constructor(private apartmentGroupService: AdminApartmentGroupService, 
              public dialog: MatDialog,
              private toastr: ToastrService,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getApartmentGroups();
    console.log(this.apartmentGroups);
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

    
  }

  

     

  getApartmentGroups() {
    this.apartmentGroupService.getApartmentGroupsForAdmin().subscribe(
      data => { this.apartmentGroups = data; console.log(this.apartmentGroups)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

  deleteApartmentGroup(id) {

    
    
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje grupe apartmana';
    modalRef.componentInstance.description = 'Želite li izbrisati grupu apartmana?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.apartmentGroupService.deleteApartmentGroup(id).pipe(take(1)).subscribe(data => {
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getApartmentGroups();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openAddApartmentGroupModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAddOrEditApartmentGroupComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      console.log('openmodal',row);
      
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje grupe - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena grupe';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Dodaj grupu/apartman';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getApartmentGroups();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getApartmentGroups();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getApartmentGroups();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

}
