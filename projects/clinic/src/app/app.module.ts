import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';
import { FilterNetworkPipe } from './shared/pipe/filter-network.pipe';
import { IMaskModule } from 'angular-imask';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDividerModule } from '@angular/material/divider';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpServiceInterceptor } from '../../../patient/src/app/services/http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClinicMenuComponent } from './shared/clinic-menu/clinic-menu.component';
import { ClinicComponent } from './clinic/clinic.component';
import { PreRegisterPatientDialogComponent } from './shared/pre-register-patient-dialog/pre-register-patient-dialog.component';
import { PreRegisterProfessionalDialogComponent } from './shared/pre-register-professional-dialog/pre-register-professional-dialog.component';
import { LoginModule } from 'projects/patient/login/login.module';
import { ForgetPasswordModule } from 'projects/patient/forget-password/forget-password.module';

import { RedeComponent } from './rede/rede.component';

@NgModule({
  declarations: [
      AppComponent,
      MenuComponent,
      FooterComponent,
      ClinicMenuComponent,
      ClinicComponent,
      PreRegisterPatientDialogComponent,
      PreRegisterProfessionalDialogComponent,
      RedeComponent,
      FilterNetworkPipe
   ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pt-br'
    },
    LocalDateTimePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatAutocompleteModule,
    MatDividerModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgbRatingModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatListModule,
    CommonModule,
    IMaskModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FileUploadModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    LoginModule,
    ForgetPasswordModule

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
