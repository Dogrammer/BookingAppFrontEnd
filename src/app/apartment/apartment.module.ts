import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentGroupComponent } from './apartment-group/apartment-group.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [ApartmentGroupComponent, ApartmentComponent, ApartmentDetailComponent, HomeComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule
  ]
})
export class ApartmentModule { }
