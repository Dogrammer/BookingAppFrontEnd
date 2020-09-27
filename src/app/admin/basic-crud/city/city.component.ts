import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { ICity } from '../../models/city';
import { ModalAoeCityComponent } from '../modals/modal-aoe-city/modal-aoe-city.component';
import { BasicCrudService } from '../services/basic-crud.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cities: ICity[] = [];
  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;

  constructor(private basicCrudService: BasicCrudService, 
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getCities();
    console.log(this.cities);
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

    
  }

  

     

  getCities() {
    this.basicCrudService.getCities().subscribe(
      data => { this.cities = data; console.log(this.cities)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

  deleteCity(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje grada';
    modalRef.componentInstance.description = 'Želite li izbrisati grad?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.basicCrudService.deleteCity(id).pipe(take(1)).subscribe(data => {
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getCities();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openAddCityModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAoeCityComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      console.log('openmodal',row);
      
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje grada - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena grada';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Dodaj grad';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getCities();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getCities();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getCities();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

}
