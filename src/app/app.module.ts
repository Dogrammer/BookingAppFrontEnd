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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/http.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr/toastr/toastr.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('token'),
    whitelistedDomains: ['localhost:5001', 'https://localhost:5001/', 'localhost:5001/api']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    // HomeComponent,
    SiteNavbarComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    NgImageSliderModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule ,
    MatDialogModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        // deps: [TokenService]
      }
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedRoutes: ['localhost:5000'],
    //     blacklistedRoutes: ['localhost:5000/api/auth']
    //   }
    // })
  ],
  providers: [AuthGuardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
