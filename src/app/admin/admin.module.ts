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
import { ModalAddOrEditApartmentGroupComponent } from './admin-apartment-group/modal-add-or-edit-apartment-group/modal-add-or-edit-apartment-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddAdminApartmentFormComponent } from './add-admin-apartment-form/add-admin-apartment-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminPricingPeriodDetailsComponent } from './admin-pricing-period-details/admin-pricing-period-details.component';
import { AdminApartmentImagesComponent } from './admin-apartment-images/admin-apartment-images.component';
import { ReservationOverviewComponent } from './reservation-overview/reservation-overview.component';



@NgModule({
  declarations: [AdminHomeComponent, UploadComponent, ImageUploadComponent, AdminApartmentGroupComponent, AdminApartmentComponent, AdminApartmentDetailComponent, ModalAddOrEditApartmentGroupComponent, AddAdminApartmentFormComponent, AdminPricingPeriodDetailsComponent, AdminApartmentImagesComponent, ReservationOverviewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxDatatableModule,
    NgbModule

  ]
})
export class AdminModule { }
