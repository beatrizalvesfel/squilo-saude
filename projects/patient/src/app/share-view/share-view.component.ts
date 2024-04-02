import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { LoaderService } from '../services/loader.service';
import { ShareService } from '../services/share.service';
import { NavServiceService } from '../services/nav-service.service'

enum RoutingType {
  Internal = 'internal',
  External = 'external',
}

@Component({
  selector: 'app-share-view',
  templateUrl: './share-view.component.html',
  styleUrls: ['./share-view.component.css'],
})
export class ShareViewComponent extends BasePage implements OnInit {
  examId: any;
  examName: string | undefined;
  userID: string | undefined;
  blobUrl: string | undefined;
  shouldDisplayPdf: boolean = false;
  examNotFound: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    router: Router,
    cookieService: CookieServiceService,
    public loaderService: LoaderService,
    private shareService: ShareService,
    public navService: NavServiceService
    ) {
    super(router, cookieService);
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.activatedRoute.params.subscribe((params: any) => {
      this.activatedRoute.queryParamMap.subscribe((queryParams) => {
        const routingType = queryParams.get('routingType');

        switch (routingType) {
          case RoutingType.Internal:
              this.navigateToLogin();
              this.cookieService.set('comingFrom','internal')
            break;
          case RoutingType.External:
            this.cookieService.set('comingFrom','external')
            this.navigateToRegister();
            break;
          default:
            console.log('routingType not defined, please check the params ?routingType=')
            break;
        }
      });
    });
  }

  private handleInternalRouting(params: any): void {
    this.userID = params.examOwnerId;
    this.shareService.getShareExam(params.examId, params.examOwnerId).subscribe({
      next: (v) => {
        this.blobUrl = v.examProperties.blobUrl;
        this.examName = v.examName;
        this.examId = v.examID;
        this.shouldDisplayPdf = true;
      },
      error: (e) => {
        this.examNotFound = true;
      },
      complete: () => {},
    });
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  private navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

