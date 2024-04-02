import { ExamServiceService } from './../services/exam-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ShareExamComponent } from '../share-exam/share-exam.component';
import { MatDialog } from '@angular/material/dialog';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent extends BasePage implements OnInit {

  examProperties: any;
  blobUrl: any;
  examId: any;
  examName: any = []
  src: any
  private userID: any;


  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    public examService: ExamServiceService,
    public dialog: MatDialog
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
    this.activatedRoute.params.subscribe((params: any) => {
      this.examService.getExam(params.id).subscribe(result => {
        this.examProperties = result.examProperties;
        this.examName = result.examName;
        this.examId = result.examID;
        this.src = this.examProperties.blobUrl
      });
    });


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

}
