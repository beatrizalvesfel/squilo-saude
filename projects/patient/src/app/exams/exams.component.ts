import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewExamDialogComponent } from './new-exam-dialog/new-exam-dialog.component';
import { ExamServiceService } from '../services/exam-service.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';
import { _getEventTarget } from '@angular/cdk/platform';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { ShareExamComponent } from '../share-exam/share-exam.component';
import { NavServiceService } from '../services/nav-service.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent extends BasePage implements OnInit{

  searchText = '';
  examslist: any = []
  dados: any = [];

  constructor(
    router: Router,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public navService: NavServiceService,
    public examService: ExamServiceService,
    cookieService: CookieServiceService
  ) {
    super(router, cookieService);
    this.examService.listen().subscribe((m: any)=> {
      this.refreshExamsList();
    })
  }

  ngOnInit(): void {
    this.routeUserNotLogged();
    this.refreshExamsList();
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

  close() {
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
        const linkExam = `/examview/${examID}`
        this.router.navigateByUrl(linkExam)
      } else {
        const linkExam = `/examview/${examID}`
        this.router.navigateByUrl(linkExam)
      }
    })
  }

  refreshExamsList(){
    this.examService.examsList().subscribe(
      (data) => {
        this.dados = data
        this.examslist = this.dados
      }
    )
  }

  shareExam(examID: String) {
    let dialogRef = this.dialog.open(ShareExamComponent, {
      height: '400px',
      width: '600px',
      autoFocus: false
    });
  }

}
