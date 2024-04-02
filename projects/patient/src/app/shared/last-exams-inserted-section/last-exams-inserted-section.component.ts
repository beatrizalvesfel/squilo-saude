import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../../services/cookie-service.service';
import { BasePage } from '../../services/base.page';
import { LoaderService } from '../../services/loader.service';
import { ExamServiceService } from '../../services/exam-service.service';
import { NavServiceService } from '../../services/nav-service.service';
import { NewExamDialogComponent } from '../../exams/new-exam-dialog/new-exam-dialog.component';
import { environment } from 'projects/patient/src/environments/environment';
import { ShareExamComponent } from '../../share-exam/share-exam.component';


@Component({
  selector: 'app-last-exams-inserted-section',
  templateUrl: './last-exams-inserted-section.component.html',
  styleUrls: ['./last-exams-inserted-section.component.scss']
})
export class LastExamsInsertedSectionComponent extends BasePage implements OnInit {

  searchText = '';
  examslist: any = []
  dados: any = [];
  linkExam: any

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public dialog: MatDialog,
    public examService: ExamServiceService,
    public loaderService: LoaderService,
    public navService: NavServiceService


  ) {
    super(router, cookieService);
    this.examService.listen().subscribe((m: any) => {
      console.log(m)
      this.refreshExamsList()
    })
  }

  ngOnInit(): void {
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
    this.refreshExamsList()
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

  deleteExam(examID: any) {
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

  seeExam(examID: any) {
    this.examService.getExam(examID).subscribe( () => {
      if (environment.production) {
        const linkExam = `/examview/${examID}`
        this.router.navigateByUrl(linkExam)
      } else {
        const linkExam = `/examview/${examID}`
        this.router.navigateByUrl(linkExam)
      }
    })
  }

  refreshExamsList() {
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
