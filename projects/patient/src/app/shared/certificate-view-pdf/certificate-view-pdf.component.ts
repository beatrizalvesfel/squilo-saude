import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from '../../services/base.page';
import { CookieServiceService } from '../../services/cookie-service.service';
import { LoaderService } from '../../services/loader.service';
import { CertificateService } from '../../services/certificate.service';
import { ShareService } from '../../services/share.service';
import { ExamServiceService } from '../../services/exam-service.service';

@Component({
selector: 'app-certificate-view-pdf',
templateUrl: './certificate-view-pdf.component.html',
styleUrls: ['./certificate-view-pdf.component.css']
})

export class CertificateViewPdfComponent extends BasePage implements OnInit {

  certificateUrl: any;
  id: any;
  certificateName: any
  endDate: any
  startDate: any = []
  src: any
  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    public certificateService: CertificateService,
    private shareService: ShareService,
    public examService: ExamServiceService,
    private clipboard: Clipboard,

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
      this.shareService.getcertificate(params.id).subscribe(result => {
        this.certificateUrl = result.certificateUrl;
        this.certificateName = result.certificateName;
        this.endDate = result.endDate;
        this.startDate = result.startDate;
        this.id =  result.id;
        this.src = this.certificateUrl.blobUrl
      });
    });


}

}
