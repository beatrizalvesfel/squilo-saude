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
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';
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
import { HttpServiceInterceptor } from './services/http.interceptor';


import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component'
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { AppComponent } from './app.component';
import { NewExamDialogComponent } from './exams/new-exam-dialog/new-exam-dialog.component';
import { ExamsComponent } from './exams/exams.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { VaccinationComponent } from './vaccination/vaccination.component';
import { SurgeriesComponent } from './surgeries/surgeries.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { NotesComponent } from './notes/notes.component';
import { MedicalCertificatesComponent } from './medical-certificates/medical-certificates.component';
import { ShareViewComponent } from './share-view/share-view.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { UpdateProfessionalUserComponent } from './update-professional-user/update-professional-user.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { LastExamsInsertedSectionComponent } from './shared/last-exams-inserted-section/last-exams-inserted-section.component';
import { LastNotesInsertedSectionComponent } from './shared/last-notes-inserted-section/last-notes-inserted-section.component';
import { NewMedicalCerficateDialogComponent } from './medical-certificates/new-medical-cerficate-dialog/new-medical-cerficate-dialog.component';
import { MetricsDialogComponent } from './shared/my-monitoring/metrics-dialog/metrics-dialog.component';
import { ShareExamDialogComponent } from './exams/share-exam-dialog/share-exam-dialog.component';
import { NewNoteDialogComponent } from './notes/new-note-dialog/new-note-dialog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangeProfilePicDialogComponent } from './shared/change-profile-pic-dialog/change-profile-pic-dialog.component';
import { FilterPipe } from './shared/pipe/filter.pipe';
import { MyMonitoringComponent } from './shared/my-monitoring/my-monitoring.component';
import { CertificatesViewComponent } from './certificates-view/certificates-view.component';
import { ShareCertificatesComponent } from './share-certificates/share-certificates.component';
import { EditNoteDialogComponent } from './notes/edit-note-dialog/edit-note-dialog.component';
import { DeleteAccountCodeComponent } from './delete-account-code/delete-account-code.component';
import { ExamViewPdfComponent } from './shared/exam-view-pdf/exam-view-pdf.component'
import { ShareViewPdfComponent } from './shared/shared-view-pdf/shared-view-pdf.component'
import { NotificationComponent } from './notification/notification.component';
import { CertificateViewPdfComponent } from './shared/certificate-view-pdf/certificate-view-pdf.component'
import { ReceivedExamPdfComponent } from './shared/received-exam-pdf/received-exam-pdf.component'
import { ShareExamComponent } from './share-exam/share-exam.component';
import { ReceivedExamComponent } from './received-exam/received-exam.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    VerificationCodeComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    ComingSoonComponent,
    UserMenuComponent,
    LoginComponent,
    ForgetPasswordComponent,
    UpdateUserComponent,
    UpdateProfessionalUserComponent,
    NewExamDialogComponent,
    ExamsComponent,
    ScheduleComponent,
    MedicinesComponent,
    VaccinationComponent,
    SurgeriesComponent,
    PrescriptionsComponent,
    NotesComponent,
    MedicalCertificatesComponent,
    ShareViewComponent,
    ShareExamDialogComponent,
    ExamViewComponent,
    ContactUsComponent,
    ChangeProfilePicDialogComponent,
    NewNoteDialogComponent,
    NewPasswordComponent,
    LocalDateTimePipe,
    FilterPipe,
    NewNoteDialogComponent,
    LastExamsInsertedSectionComponent,
    LastNotesInsertedSectionComponent,
    NewMedicalCerficateDialogComponent,
    MyMonitoringComponent,
    CertificatesViewComponent,
    ShareCertificatesComponent,
    MetricsDialogComponent,
    EditNoteDialogComponent,
    DeleteAccountCodeComponent,
    ExamViewPdfComponent,
    ReceivedExamPdfComponent,
    ShareViewPdfComponent,
    ShareExamComponent,
    CertificateViewPdfComponent,
    NotificationComponent,
    ReceivedExamComponent,
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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
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
    MatAutocompleteModule
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
