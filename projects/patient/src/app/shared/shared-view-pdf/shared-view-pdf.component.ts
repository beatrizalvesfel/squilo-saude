import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../../services/base.page';
import { CookieServiceService } from '../../services/cookie-service.service';

@Component({
  selector: 'app-share-view-pdf',
  templateUrl: './shared-view-pdf.component.html',
  styleUrls: ['./shared-view-pdf.component.css']

})
export class ShareViewPdfComponent extends BasePage implements OnInit {

  @Input()
  blobUrl: any | undefined;

  constructor(
    router: Router,
    cookieService: CookieServiceService
  ) {
    super(router, cookieService);
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
