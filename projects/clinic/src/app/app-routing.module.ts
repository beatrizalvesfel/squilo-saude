import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';
import { LoginComponent } from 'projects/patient/login/login.component';
import {RedeComponent} from './rede/rede.component';
import { ForgetPasswordComponent } from 'projects/patient/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'clinic', component: ClinicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'network', component: RedeComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
