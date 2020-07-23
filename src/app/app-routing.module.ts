import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthGuardService } from './auth/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'site', component: SiteLayoutComponent,
    loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuardService], data: {roles: ['Admin', 'ApartmentManager']},
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
