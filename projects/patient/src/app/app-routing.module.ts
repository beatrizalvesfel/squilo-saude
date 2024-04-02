import { DeleteAccountCodeComponent } from './delete-account-code/delete-account-code.component';
import { ShareCertificatesComponent } from './share-certificates/share-certificates.component';
import { CertificatesViewComponent } from './certificates-view/certificates-view.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { ExamsComponent } from './exams/exams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { UpdateUserComponent } from './update-user/update-user.component'
import { UpdateProfessionalUserComponent } from './update-professional-user/update-professional-user.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { VaccinationComponent } from './vaccination/vaccination.component';
import { SurgeriesComponent } from './surgeries/surgeries.component';
import { MedicalCertificatesComponent } from './medical-certificates/medical-certificates.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { NotesComponent } from './notes/notes.component';
import { ShareViewComponent } from './share-view/share-view.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NotificationComponent } from './notification/notification.component';
import { ReceivedExamComponent } from './received-exam/received-exam.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: VerificationCodeComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'main', component: MainComponent },
  { path: 'updateuser', component: UpdateUserComponent},
  { path: 'updateprofessionaluser', component: UpdateProfessionalUserComponent},
  { path: 'exams', component: ExamsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'medicines', component: MedicinesComponent },
  { path: 'vaccination', component: VaccinationComponent },
  { path: 'surgeries', component: SurgeriesComponent },
  { path: 'certificates', component: MedicalCertificatesComponent },
  { path: 'prescriptions', component: PrescriptionsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'shareview/:examId/:examOwnerId', component: ShareViewComponent },
  { path: 'examview/:id', component: ExamViewComponent },
  { path: 'receivedexam', component: ReceivedExamComponent },
  { path: 'certificateview/:id', component: CertificatesViewComponent },
  { path: 'sharecertificate/:id', component: ShareCertificatesComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'resetpassword/:guid', component: NewPasswordComponent },
  { path: 'deleteaccount', component: DeleteAccountCodeComponent },
  { path: 'notification', component: NotificationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
