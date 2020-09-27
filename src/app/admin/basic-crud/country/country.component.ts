import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { ICountry } from '../../models/country';
import { ModalAoeCountryComponent } from '../modals/modal-aoe-country/modal-aoe-country.component';
import { BasicCrudService } from '../services/basic-crud.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countries: ICountry[] = [];
  columns: any[] = [];

  loadingIndicator = true;
  reorderable = true;

  constructor(private basicCrudService: BasicCrudService, 
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              private ngbModalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getCountries();
    this.columns = [
      {
        name: 'Name', prop: 'name', sortable: true, width: 150
      },
      {
        name: 'Description', prop: 'description', sortable: true, width: 150
      }
       ];

    
  }

  getCountries() {
    this.basicCrudService.getCountries().subscribe(
      data => { this.countries = data; console.log(this.countries)}
    )
  }

  navigateToDetails(id) {
    this.router.navigate(['/admin/apartment-group/', id]);
  }

  deleteCountry(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje države';
    modalRef.componentInstance.description = 'Želite li izbrisati državu?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.basicCrudService.deleteCountry(id).pipe(take(1)).subscribe(data => {
          if (data) {
            // this.isLoadingApproval = false;
            // when request is sent to editing, it is no longer visible in list module
            // this.listARowDeterminator.changeSelectedRow(null);
            // this.toastr.success('Uspješno ste prihvatili zahtjev', 'Uspjeh', this.toastrVar);
            // this.router.navigate(['/lists/rejected-request-list']);
          }
          this.getCountries();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openAddCountryModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAoeCountryComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      console.log('openmodal',row);
      
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje države - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena države';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Dodaj državu';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getCountries();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getCountries();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getCountries();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

}
