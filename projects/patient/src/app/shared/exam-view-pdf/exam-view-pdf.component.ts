import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from '../../services/base.page';
import { CookieServiceService } from '../../services/cookie-service.service';
import { LoaderService } from '../../services/loader.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-exam-view-pdf',
  templateUrl: './exam-view-pdf.component.html',
  styleUrls: ['./exam-view-pdf.component.css']
})
export class ExamViewPdfComponent extends BasePage implements OnInit {
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
    private shareService: ShareService,
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

    this.userID = this.cookieService.get("user-id");
    this.activatedRoute.params.subscribe((params: any) => {
      this.shareService.getShareExam(params.id, this.userID).subscribe(result => {
        this.examProperties = result.examProperties;
        this.examName = result.examName;
        this.examId = result.examID;
        this.src = this.examProperties.blobUrl
      });
    });
  }

}
