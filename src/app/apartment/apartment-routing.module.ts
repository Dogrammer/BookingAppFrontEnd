import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ApartmentGroupComponent } from './apartment-group/apartment-group.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';


const routes: Routes = [{ 
  path: 'home', 
  component: HomeComponent,
},
{
  path: 'apartment-groups',
  component: ApartmentGroupComponent
},
{
  path: 'apartment-group/:id',
  component: ApartmentComponent
},
{
  path: 'apartment/:id',
  component: ApartmentDetailComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
