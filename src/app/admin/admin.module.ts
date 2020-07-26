import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UploadComponent } from './upload/upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminApartmentGroupComponent } from './admin-apartment-group/admin-apartment-group.component';
import { AdminApartmentComponent } from './admin-apartment/admin-apartment.component';
import { AdminApartmentDetailComponent } from './admin-apartment-detail/admin-apartment-detail.component';


@NgModule({
  declarations: [AdminHomeComponent, UploadComponent, ImageUploadComponent, AdminApartmentGroupComponent, AdminApartmentComponent, AdminApartmentDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
