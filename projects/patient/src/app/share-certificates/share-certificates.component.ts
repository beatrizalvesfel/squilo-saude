import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { LoaderService } from '../services/loader.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-share-certificates',
  templateUrl: './share-certificates.component.html',
  styleUrls: ['./share-certificates.component.css']
})
export class ShareCertificatesComponent extends BasePage implements OnInit {

  certificateUrl: any;
  id: any;
  certificateName: any
  endDate: any
  startDate: any = []

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


    this.activatedRoute.params.subscribe((params: any) => {
      this.shareService.getcertificate(params.id).subscribe(result => {
        this.certificateUrl = result.certificateUrl;
        this.certificateName = result.certificateName;
        this.endDate = result.endDate;
        this.startDate = result.startDate;
        this.id =  result.id
      });
    });


}
}





