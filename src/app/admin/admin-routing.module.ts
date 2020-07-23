import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { 
  AuthGuardService as AuthGuard 
} from '../auth/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'home', component: AdminHomeComponent
  },
  { path: '',   redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
