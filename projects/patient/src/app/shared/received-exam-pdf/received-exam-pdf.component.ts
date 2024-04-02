import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BasePage } from '../../services/base.page';
import { CookieServiceService } from '../../services/cookie-service.service';
import { LoaderService } from '../../services/loader.service';
import { ShareService } from '../../services/share.service';
import { ExamServiceService } from '../../services/exam-service.service';

@Component({
  selector: 'app-received-exam-pdf',
  templateUrl: './received-exam-pdf.component.html',
  styleUrls: ['./received-exam-pdf.component.css']
})
export class ReceivedExamPdfComponent extends BasePage implements OnInit {

  @Input()
  userID!: string;

  @Input()
  examID!: string;

  examProperties: any;
  blobUrl: any;
  examId: any;
  examName: any = [];
  src: any;

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    private shareService: ShareService,
    public examService: ExamServiceService,
  ) {
    super(router, cookieService);
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.routeUserNotLogged();
    this.shareService.getShareExam(this.examID, this.userID)
      .subscribe({
        next: (v) => {
          this.examProperties = v.examProperties;
          this.examId = v.examID;
          this.src = this.examProperties.blobUrl
        },
        error: (e) => {
          if (e.error.errors === "Usuário não encontrado!") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Exame ou usuário não encontrado",
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['main']);
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Ocorreu um erro inesperado, se o erro persistir entre em contato com o nosso suporte."
            })
          }
        },
        complete: () => console.info('complete view exam')
      });
  }
}