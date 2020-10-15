import { Component, OnInit, ViewChild } from '@angular/core';
import { ApartmentDetailService } from '../services/apartment-detail.service';
import { IApartment } from '../models/apartment';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalReservationComponent } from './modal-reservation/modal-reservation.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from '../services/gallery.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { AdminApartmentService } from 'src/app/admin/services/admin-apartment.service';
import { IPricingPeriodDetail } from 'src/app/admin/models/pricingPeriodDetails';
import { ReservationService } from 'src/app/admin/services/reservation.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  id: number;
  available;
  public model: NgbDateStruct;
  apartment: IApartment;
  pricingPeriods: IPricingPeriodDetail[] = [];
  images: Array<string> = [];
  isLoading: boolean = false;
  currentPricingPeriod: IPricingPeriodDetail;
  openModal: boolean = false;
  price;

  reservationGroup: FormGroup = this.formBuilder.group({
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
    price: [null],
    apartmentId: [null, Validators.required]
  });

  
  // images = ['../../assets/homepage/home1.jpg', '../../assets/homepage/home2.jpg', '../../assets/homepage/home3.jpg' ]

  constructor(private apartmentDetailService: ApartmentDetailService,
              private galleryService: GalleryService, 
              private SpinnerService: NgxSpinnerService,
              private reservationService: ReservationService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private adminApartmentService: AdminApartmentService,
              private authService: AuthService,
              private ngbModalService: NgbModal) { }

              

  ngOnInit(): void {

    

      
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getApartment(this.id);
    this.getPricingPeriods();
    this.getCurrentPricingPeriod();
    if(this.id) {
      this.reservationGroup.patchValue({
        apartmentId: this.id
      });
    }

    
    

    

  }
  // openSpinner() {
  //   this.SpinnerService.show();

  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //     this.SpinnerService.hide();
  //   }, 100);
  // }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

  getApartment(id) {
    this.apartmentDetailService.getApartment(id).subscribe(
      data => { this.apartment = data;
          this.images = data.images;
          this.isLoading = true;
          console.log(this.apartment);
        }
    )
  }

  

  saveReservation()  {
    if(!this.reservationGroup.valid) {
      return;
    } else {
      console.log('validna forma', this.reservationGroup.value);
      
      this.reservationService.saveReservation(this.reservationGroup.value).pipe(take(1)).subscribe(data => {
        // this.modal.close('add')
      });
    }
  }

  getPricingPeriods() {
    this.adminApartmentService.getPricingPeriodDetailsByApartmentId(this.id).subscribe(
      data => { this.pricingPeriods = data; console.log(this.pricingPeriods)}
    )
  }

  checkAvailability() {
    
    this.apartmentDetailService.checkAvailability(this.reservationGroup.value).subscribe(
      data => {
        this.available = data;
        this.openModal = true;
        this.getPriceForReservation();
        
      }
    )
    
  }

  getPriceForReservation() {
    this.apartmentDetailService.getPrice(this.reservationGroup.value).subscribe(
      data => {
        this.price = data;
        this.openReservationModal(this.reservationGroup.value, this.id);
      }
    )
  }

  getCurrentPricingPeriod() {
    this.apartmentDetailService.getCurrentPricingPeriod(this.id).subscribe(
      data => {
        this.currentPricingPeriod = data;
      }
    )
  }

  loggedIn() {
    if (this.authService.isAuthenticated()){
      return true;
    }
    return false;
  }

  // sendReservation()  {
  //   console.log('usao u komponentu');
  //   console.log(this.reservationFormGroup.value);
    
    
  //   if(!this.reservationFormGroup.valid) {
  //     console.log('forma nije dobra');
      
  //     return;
  //   } else {
  //     this.apartmentDetailService.sendReservation(this.reservationFormGroup.value).pipe(take(1)).subscribe(data => {
  //     });
  //   }
  // }

  // openReservationModal(row?) {
  //   const modalRef = this.ngbModalService.open(ModalReservationComponent, { size: 'lg', backdrop: 'static', keyboard: false});
  // }

  openReservationModal(apartmentId, row?) {
    if (this.openModal === true){
      const modalRef = this.ngbModalService.open(ModalReservationComponent, {size: 'lg', backdrop: 'static', keyboard: false});
      if(apartmentId) {
        
        modalRef.componentInstance.apartmentId = this.id;
        console.log(modalRef.componentInstance.apartmentId = this.id);
        
        if (this.available === false) {
          modalRef.componentInstance.title = 'Apartman nije raspoloživ za odabrane datume'
          
        } else {
          modalRef.componentInstance.title ='Pošalji zahtjev za rezervaciju apartmana'
          modalRef.componentInstance.price = this.price;
          modalRef.componentInstance.row = this.reservationGroup.value;
          modalRef.componentInstance.action = 'add';
        }
      }
      
      modalRef.result.then(result => {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        if (result == 'add') {
          // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
          // this.location();
        } else if(result == 'edit') {
          // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
          // this.getApartmentGroups();
        } else if(result == 'delete') {
          // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
          // this.getApartmentGroups();
        }
        setTimeout(() => {  
        // this.filterProgrammeType();
      }, 200)
      }).catch((res) => {});
    }
    
  }

  get dateTo(): AbstractControl {
    return this.reservationGroup.get('dateTo');
  }

  get dateFrom(): AbstractControl {
    return this.reservationGroup.get('dateFrom');
  }
}
