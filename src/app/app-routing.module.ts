import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{ 
  path: 'site', 
  component: SiteLayoutComponent,
  children: [
    { path: 'home', component: HomeComponent },
  ]
},

// App routes goes here here
// { 
//   path: 'dashboard',
//   component: AdminLayoutComponent, 
//   children: [
//     { path: 'dashboard', component: AboutUsComponent },
    
//   ]
// },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
