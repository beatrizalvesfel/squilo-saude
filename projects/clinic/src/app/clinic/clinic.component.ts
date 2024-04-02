import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../../../../patient/src/app/services/base.page';
import { NavServiceService } from '../../../../patient/src/app/services/nav-service.service';
import { CookieServiceService } from '../../../../patient/src/app/services/cookie-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PreRegisterPatientDialogComponent }  from '../shared/pre-register-patient-dialog/pre-register-patient-dialog.component' ;
import { PreRegisterProfessionalDialogComponent } from '../shared/pre-register-professional-dialog/pre-register-professional-dialog.component';
import { RedeService } from '../services/rede.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent extends BasePage implements OnInit {

  professionalsLength: any;
  patientsLength: any;
  redeList: any = []
  redeListConnected: any = []
  redePatientsList: any = []
  redeProfessionalsList: any = []



  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PreRegisterPatientDialogComponent>,
    public redeService: RedeService,

  ) {
    super(router, cookieService);
    this.redeService.listen().subscribe((m: any)=> {
      this.getNetworkPatients();
    })
    this.redeService.listen().subscribe((m: any)=> {
      this.getNetworkProfessionals();
    })
   }

  ngOnInit() {
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
    this.getNetworkPatients();
    this.getNetworkProfessionals();
    this.refreshPatientlList();
    this.refreshProfessionalList();
    this.refreshRedeList()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


  }

  getNetworkPatients() {
    this.redeService.getNetworkPatients().subscribe(
      (data) => {
        this.redePatientsList = data
      }
    )
  }

  getNetworkProfessionals() {
    this.redeService.getNetworkProfessionals().subscribe(
      (data) => {
        this.redeProfessionalsList = data
      }
    )
  }


  preRegisterPatient(): void {
    const dialogRef = this.dialog.open(PreRegisterPatientDialogComponent, {
      width: '80%',
    })
  }

  preRegisterProfessional(): void {
    const dialogRef = this.dialog.open(PreRegisterProfessionalDialogComponent, {
      width: '80%',
    })
  }


  cancel(): void {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }

  refreshProfessionalList() {
    this.redeService.getNetworkProfessionals().subscribe(
      (data) => {
        this.redeProfessionalsList = data
        if(this.redeProfessionalsList.length != 0) {
          for (let i = 0; i < this.redeProfessionalsList.length; i++) {
            if(this.redeProfessionalsList[i].connected == true) {
              this.professionalsLength = i
            }
          }
        } else {
          this.professionalsLength = 0
          this.refreshProfessionalList()
        }
      }
    )
  }

  refreshPatientlList() {
    this.redeService.getNetworkPatients().subscribe(
      (data) => {
        this.redePatientsList = data
        if(this.redePatientsList.length != 0) {
          for (let i = 0; i < this.redePatientsList.length; i++) {
            if(this.redePatientsList[i].connected == true) {
              this.patientsLength = i
            }
          }
        } else {
          this.patientsLength = 0
          this.refreshPatientlList()
        }
      }
    )
  }

  refreshRedeList() {
    this.redeService.getNetworkAll().subscribe(
      (data) => {
        this.redeList = data
        for (let i = 0; i < this.redeList.length; i++) {
          console.log(this.redeList)
          if(this.redeList[i].connected == true) {
          this.redeListConnected[i] = this.redeList[i]
          }
        }
          console.log(this.redeListConnected)
      }
    )
  }



}
