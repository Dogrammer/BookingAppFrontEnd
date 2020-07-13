import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { SiteNavbarComponent } from './layout/site-layout/site-navbar/site-navbar.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    HomeComponent,
    SiteNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
