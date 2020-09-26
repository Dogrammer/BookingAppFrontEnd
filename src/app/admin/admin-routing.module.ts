import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { 
  AuthGuardService as AuthGuard, AuthGuardService 
} from '../auth/services/auth-guard.service';
import { UploadComponent } from './upload/upload.component';
import { AdminApartmentDetailComponent } from './admin-apartment-detail/admin-apartment-detail.component';
import { AdminApartmentComponent } from './admin-apartment/admin-apartment.component';
import { AdminApartmentGroupComponent } from './admin-apartment-group/admin-apartment-group.component';
import { componentFactoryName } from '@angular/compiler';
import { AddAdminApartmentFormComponent } from './add-admin-apartment-form/add-admin-apartment-form.component';
import { AdminPricingPeriodDetailsComponent } from './admin-pricing-period-details/admin-pricing-period-details.component';
import { AdminApartmentImagesComponent } from './admin-apartment-images/admin-apartment-images.component';
import { ReservationOverviewComponent } from './reservation-overview/reservation-overview.component';
import { CityComponent } from './basic-crud/city/city.component';
import { CountryComponent } from './basic-crud/country/country.component';
import { UsersComponent } from './basic-crud/users/users.component';
import { ApartmentTypeComponent } from './basic-crud/apartment-type/apartment-type.component';


const routes: Routes = [
  {
    path: 'home', 
    component: AdminHomeComponent
  },
  {
    path: 'upload', 
    component: UploadComponent
  },
  {
    path: 'apartment-groups', 
    component : AdminApartmentGroupComponent
  },
  {
    path: 'city',
    component: CityComponent,
    canActivate: [AuthGuardService], data: {roles: ['Admin']}
  },
  {
    path: 'country',
    component: CountryComponent,
    canActivate: [AuthGuardService], data: {roles: ['Admin']}
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService], data: {roles: ['Admin']}
  },
  {
    path: 'apartment-types',
    component: ApartmentTypeComponent,
    canActivate: [AuthGuardService], data: {roles: ['Admin']}
  },
  {
    path: 'apartment-group/:id', 
    component: AdminApartmentComponent
  },
  {
    path: 'apartment/new-apartment', 
    component: AddAdminApartmentFormComponent
  },
  {
    path: 'apartment/:id/edit-apartment',
    component: AddAdminApartmentFormComponent
  },
  {
    path: 'apartment/:id/pricing-period-details',
    component: AdminPricingPeriodDetailsComponent
  },
  {
    path: 'apartment/:id/images',
    component: AdminApartmentImagesComponent
  },
  {
    path: 'apartment/:id', 
    component: AdminApartmentDetailComponent
  },
  
  { 
    path: '',   redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'reservations', 
    component: ReservationOverviewComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
