import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../services/cookie-service.service';
import { LoaderService } from '../services/loader.service';
import { BasePage } from '../services/base.page';
import { NavServiceService } from '../services/nav-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-delete-account-code',
  templateUrl: './delete-account-code.component.html',
  styleUrls: ['./delete-account-code.component.scss']
})
export class DeleteAccountCodeComponent extends BasePage implements OnInit {

  private userId: any;

  code1: any;

  constructor(
    private patientService: PatientService,
    router: Router,
    cookieService: CookieServiceService,
    private authService: AuthenticationService,
    public loaderService: LoaderService,
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
    this.userId = this.cookieService.get("user-id");

    this.routeUserNotLogged();
    this.navService.shouldDisplayLoggedMenu.next(true);

  }

  deleteAccount() {
    const code = `${this.code1}`;
    this.patientService.deleteAccount(code).subscribe({
        next: (user) => Swal.fire({
          title: ':(',
          text: 'Espero que isso seja um "Até logo"',
          imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
          imageWidth: 100,
          imageHeight: 70,
          imageAlt: 'Squilo',
        }).then( async () => {
          await this.logout();
          this.router.navigate(['register']);
        }),
        error: (e) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${e.error}`,
          footer: '<a href="">Porque tenho esse erro?</a>'
        }),
        complete: () => console.info('complete')
      })
  }

  logout(){
    this.authService.logout();
    this.cookieService.remove("token");
    this.cookieService.remove("user-id");
    this.navService.shouldDisplayLoggedMenu.next(false);
  }
}
