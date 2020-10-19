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
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helpers/pagination';
import { ApartmentGroupParams } from '../models/apartmentGroupParams';
import { IUser } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

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

  apartmentGroups: IApartmentGroup[];
  users: IUser[];
  isAdmin;

  pagination: Pagination;
  apartmentGroupParams:  ApartmentGroupParams = new ApartmentGroupParams;

  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;

  

  // ColumnMode = ColumnMode;
  apartmentGroupForm: FormGroup = this.formBuilder.group({
    userId: [null],
  });

  constructor(private apartmentGroupService: AdminApartmentGroupService, 
              public dialog: MatDialog,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              // private toastr: ToastrService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.getApartmentManagers();
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

  

     
  getApartmentManagers() {
    this.authService.getApartmentManagers().subscribe(
      data => { this.users = data; console.log(this.users)}
    )
  }

  checkIfAdmin() {
    this.authService.checkIfAdmin().subscribe(
      data => { this.isAdmin = data; console.log(this.isAdmin)}
    )
  }

  getApartmentGroups() {
    console.log('params:',this.apartmentGroupParams);
    this.spinnerService.show();
    this.apartmentGroupService.getApartmentGroupsForAdminPagination(this.apartmentGroupParams, this.apartmentGroupForm.value).subscribe(
      data => {
         this.apartmentGroups = data.result;
         this.pagination = data.pagination;
         this.spinnerService.hide();
        })
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

  pageChanged(event: any){
    this.apartmentGroupParams.pageNumber = event.page;
    this.getApartmentGroups();
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
        
        // this.isLoadingApproval = true;
        this.apartmentGroupService.deleteApartmentGroup(id).pipe(take(1)).subscribe(data => {
            this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh');
          this.getApartmentGroups();
        })
      } else {
        this.toastr.warning('Grupa nije obrisana', 'Pažnja');
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
        this.toastr.success('Dodali ste novu grupu apartmana', 'Uspjeh');
        this.getApartmentGroups();
      } else if(result == 'edit') {
        this.toastr.success('Uredili ste grupu apartmana', 'Uspjeh');
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

  resetFilters() {
    // this.apartmentGroupParams = new ApartmentGroupParams;
    // this.getApartmentGroups();
    this.apartmentGroupForm.reset();
    this.getApartmentGroups();
  }

  get userId(): AbstractControl {
    return this.apartmentGroupForm.get('userId');
  }

}
