import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MetricsDialogComponent } from './metrics-dialog/metrics-dialog.component';
import { CookieServiceService } from '../../services/cookie-service.service';
import { PatientService } from '../../services/patient.service';
import { NavServiceService } from '../../services/nav-service.service';
import { LoaderService } from '../../services/loader.service';
import { BasePage } from '../../services/base.page';

@Component({
  selector: 'app-my-monitoring',
  templateUrl: './my-monitoring.component.html',
  styleUrls: ['./my-monitoring.component.css']
})
export class MyMonitoringComponent extends BasePage implements OnInit {
  getName: any = []
  userName: string = "(nome)";
  weight: number | undefined;
  imc: any;
  height: number | undefined;
  bloodType: string = "-";
  metrics: any = []
  dados: any = [];
  getMetrics: any = []

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private patientService: PatientService,
    public dialog: MatDialog,
    public navService: NavServiceService,
    public loaderService: LoaderService,
  ) {
    super(router, cookieService);
    this.patientService.listen().subscribe((m: any)=> {
      this.refreshMetrics();
    })
  }

  ngOnInit() {
    this.routeUserNotLogged();
    this.refreshMetrics();
    this.patientService.getName().subscribe((name: string) => this.userName = name);
  }

  addMetrics(): void {
    const dialogRef = this.dialog.open(MetricsDialogComponent, {
      width: '80%',
    })
  }

  refreshMetrics(){
    this.patientService.metricsList().subscribe(
      (data) => {
        this.metrics = data
        this.getMetrics = data
        this.metrics.imc = this.metrics.imc.toFixed(2)
      }
    )
  }


}
