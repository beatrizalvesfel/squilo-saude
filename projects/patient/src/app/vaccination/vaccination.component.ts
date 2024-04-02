import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CookieServiceService } from '../services/cookie-service.service';
import { NavServiceService } from '../services/nav-service.service';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent extends BasePage implements OnInit {

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService

  ) {
    super(router, cookieService);
   }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.navService.shouldDisplayLoggedMenu.next(true);

    this.routeUserNotLogged();

  }

}
