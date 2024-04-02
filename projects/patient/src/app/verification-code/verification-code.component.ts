import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../services/cookie-service.service';
import { LoaderService } from '../services/loader.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  private userId: any;

  code1: any;

  constructor(private registerService: RegisterService, private router: Router, private cookieService: CookieServiceService,
    public loaderService: LoaderService,
    ) { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.userId = this.cookieService.get("user-id");
  }

  verify() {
    const code = `${this.code1}`;
    this.registerService.verify(this.userId, code).subscribe({
        next: (user) => Swal.fire({
          title: 'Bem-vindo!',
          text: 'Tudo certo!',
          imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
          imageWidth: 100,
          imageHeight: 70,
          imageAlt: 'Squilo',
        }).then(() => {
          this.router.navigate(['login']);
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

}
