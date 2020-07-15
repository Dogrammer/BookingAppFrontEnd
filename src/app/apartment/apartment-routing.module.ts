import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ApartmentGroupComponent } from './apartment-group/apartment-group.component';


const routes: Routes = [{ 
  path: 'home', 
  component: HomeComponent,
},
{
  path: 'apartment-group',
  component: ApartmentGroupComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
