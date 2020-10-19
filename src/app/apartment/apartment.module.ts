import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentGroupComponent } from './apartment-group/apartment-group.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { HomeComponent } from '../home/home.component';
import { ModalReservationComponent } from './apartment-detail/modal-reservation/modal-reservation.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// For MDB Angular Free
import { CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md'
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ApartmentGroupComponent, ApartmentComponent, ApartmentDetailComponent, HomeComponent, ModalReservationComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgxSpinnerModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    

  ]
})
export class ApartmentModule { }
