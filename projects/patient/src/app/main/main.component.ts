import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { NavServiceService } from '../services/nav-service.service';
import { NewExamDialogComponent } from '../exams/new-exam-dialog/new-exam-dialog.component';
import { NewNoteDialogComponent } from '../notes/new-note-dialog/new-note-dialog.component';
import { LoaderService } from '../services/loader.service';
import { ExamServiceService } from '../services/exam-service.service';
import Swal from 'sweetalert2';
import { _getEventTarget } from '@angular/cdk/platform';
import { environment } from '../../environments/environment';
import { CookieServiceService } from '../services/cookie-service.service';
import { PatientService } from '../services/patient.service';
import { MetricsDialogComponent } from '../shared/my-monitoring/metrics-dialog/metrics-dialog.component';
import { ShareExamComponent } from '../share-exam/share-exam.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BasePage implements OnInit {
  searchText = '';
  examslist: any = []
  examsLength: any;
  weight: number | undefined;
  imc: any;
  height: number | undefined;
  bloodType: string = "-";
  metrics: any = []
  getMetrics: any = []
  imcClass: string = "-";

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public examService: ExamServiceService,
    private patientService: PatientService,
    ) {
    super(router, cookieService);
    this.patientService.listen().subscribe((m: any)=> {
      this.refreshMetrics();
    })
  }

  ngOnInit(): void {
    this.refreshExamsList()
    this.refreshMetrics();
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addExam(): void {
    const dialogRef = this.dialog.open(NewExamDialogComponent, {
      width: '80%',
    })
  }

  addMetrics(): void {
    const dialogRef = this.dialog.open(MetricsDialogComponent, {
      width: '80%',
    })
  }

  addNote(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '80%',
    })
  }

  close() {
    this.refreshExamsList()
    this.examService.filter('Register click');
  }

  cancel() {
    this.refreshExamsList()
    this.examService.filter('Register click');
  }

  deleteExam(examID : any){
    Swal.fire({
      title: 'Você está prestes a deletar um exame',
      text: "Você tem certeza que quer deletar? Essa ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e1177',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Apagar exame',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pronto!',
          'Exame deletado',
          'success'
        )
        this.examService.deleteExam(examID).subscribe(
          sucess => this.refreshExamsList()
        )
      }
    })
  }

  seeExam(examID : any) {
    this.examService.getExam(examID).subscribe(result => {
      if (environment.production) {
      open(`${environment.examViewUrl}${examID}`);
      } else {
        console.log('local')
        open(`http://localhost:4200/#/examview/${examID}`);
      }
    })
  }

  shareExam(examID: String) {
    let dialogRef = this.dialog.open(ShareExamComponent, {
      height: '400px',
      width: '600px',
      autoFocus: false,
      data: {
        examID
      }
    });
  }

  refreshMetrics(){
    this.patientService.metricsList().subscribe(
      (data) => {
        this.metrics = data
        this.getMetrics = data
        this.metrics.imc = this.metrics.imc.toFixed(2)
        if(this.metrics.imc > 0 && this.metrics.imc <= 18.59) {
          this.imcClass = "Baixo peso"
        } else if (this.metrics.imc >= 18.60 && this.metrics.imc <= 24.99) {
          this.imcClass = "Peso normal"
        } else if (this.metrics.imc >= 25.00 && this.metrics.imc <= 29.99) {
          this.imcClass = "Sobrepeso"
        } else if (this.metrics.imc >= 30.00 && this.metrics.imc <= 34.99) {
          this.imcClass = "Obesidade grau I"
        } else if (this.metrics.imc >= 35.00 && this.metrics.imc <= 39.99) {
          this.imcClass = "Obesidade grau II"
        } else if (this.metrics.imc >= 40.00) {
          this.imcClass = "Obesidade grau III"
        } else {
          this.imcClass = "classificação"
        }
      }
    )
  }

  refreshExamsList() {
    this.examService.examsList().subscribe(
      (data) => {
        this.examslist = data
        if(this.examslist.length != 0) {
          this.examsLength = this.examslist.length
        } else {
          this.examsLength = 0
          this.refreshExamsList()
        }
      }
    )
  }

}
