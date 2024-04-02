import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../../../patient/src/app/services/nav-service.service';
import { CookieServiceService } from '../../../patient/src/app/services/cookie-service.service';
import { BasePage } from '../../../patient/src/app/services/base.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  extends BasePage implements OnInit {
  title = 'Squilo Clinic';
  private userType: any;
  isUserLogged: boolean = false;

  constructor(
    public navService: NavServiceService,
    cookieService: CookieServiceService,
    router: Router,
    ){
      super(router, cookieService);
  }

  ngOnInit(): void {
    this.userType = this.cookieService.get("userType");
    console.log(this.userType)
    this.navService.shouldDisplayLoggedMenu.subscribe(event => {
      console.log(`nav service user logged: ${event}`)
      this.isUserLogged = event;
    })
  }
}
