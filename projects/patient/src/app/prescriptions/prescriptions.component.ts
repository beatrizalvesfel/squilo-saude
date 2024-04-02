import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { NavServiceService } from '../services/nav-service.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent extends BasePage implements OnInit {

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService

  ) {
    super(router, cookieService);
  }

  ngOnInit(): void {
    this.navService.shouldDisplayLoggedMenu.next(true);

    this.routeUserNotLogged();

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
