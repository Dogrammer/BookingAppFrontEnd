import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { 
  AuthGuardService as AuthGuard 
} from '../auth/services/auth-guard.service';
import { UploadComponent } from './upload/upload.component';
import { AdminApartmentDetailComponent } from './admin-apartment-detail/admin-apartment-detail.component';
import { AdminApartmentComponent } from './admin-apartment/admin-apartment.component';
import { AdminApartmentGroupComponent } from './admin-apartment-group/admin-apartment-group.component';
import { componentFactoryName } from '@angular/compiler';
import { AddAdminApartmentFormComponent } from './add-admin-apartment-form/add-admin-apartment-form.component';


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
    path: 'apartment-group/:id', 
    component: AdminApartmentComponent
  },
  {
    path: 'apartment/new-apartment', 
    component: AddAdminApartmentFormComponent
  },
  {
    path: 'apartment/:id', 
    component: AdminApartmentDetailComponent
  },
  
  { 
    path: '',   redirectTo: 'home', pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
