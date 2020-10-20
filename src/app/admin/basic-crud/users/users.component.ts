import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/auth/models/user';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { ModalAoeUsersComponent } from '../modals/modal-aoe-users/modal-aoe-users.component';
import { BasicCrudService } from '../services/basic-crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;

  constructor(private basicCrudService: BasicCrudService, 
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              private ngbModalService: NgbModal,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

    
  }

  

     

  getUsers() {
    this.basicCrudService.getUsers().subscribe(
      data => { this.users = data; console.log(this.users)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

  deleteUser(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje korisnika';
    modalRef.componentInstance.description = 'Želite li izbrisati korisnika?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.basicCrudService.deleteUser(id).pipe(take(1)).subscribe(data => {
          this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
          this.getUsers();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openAddUserModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAoeUsersComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      console.log('openmodal',row);
      
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje korisnika - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena korisnika';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Dodaj korisnika';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getUsers();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

}
