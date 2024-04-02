import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { NavServiceService } from '../services/nav-service.service';
import { CookieServiceService } from '../services/cookie-service.service';

@Component({
  selector: 'app-main-clinic',
  templateUrl: './main-clinic.component.html',
  styleUrls: ['./main-clinic.component.css']
})
export class MainClinicComponent extends BasePage implements OnInit {

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService,
  ) {
    super(router, cookieService);
   }

  ngOnInit() {
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
  }

}
