import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-received-exam',
  templateUrl: './received-exam.component.html',
  styleUrls: ['./received-exam.component.css']
})
export class ReceivedExamComponent extends BasePage implements OnInit {

  examProperties: any;
  blobUrl: any;
  examId: any;
  examName: any = []
  src: any;
  userID!: string;
  data: any;

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    private shareService: ShareService,
  ) {
    super(router, cookieService);
    this.data = this.router.getCurrentNavigation()?.extras.state?.['response'];
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.routeUserNotLogged();

    this.activatedRoute.params.subscribe((params: any) => {
      this.userID = this.data.userID;
      this.shareService.getShareExam(this.data.userID,this.data.examID).subscribe(result => {
        this.examProperties = result.examProperties;
        this.examName = result.examName;
        this.examId = result.examID;
        this.src = this.examProperties.blobUrl
      });
    });
  }

}
