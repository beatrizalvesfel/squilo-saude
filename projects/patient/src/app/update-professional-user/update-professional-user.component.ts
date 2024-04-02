import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CepServiceService } from '../services/cep-service.service';
import { CookieServiceService } from '../services/cookie-service.service';
import { LoaderService } from '../services/loader.service';
import { NavServiceService } from '../services/nav-service.service';

@Component({
  selector: 'app-update-professional-user',
  templateUrl: './update-professional-user.component.html',
  styleUrls: ['./update-professional-user.component.css']
})

export class UpdateProfessionalUserComponent  extends BasePage implements OnInit {
  selected = 'option2';
  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  uf: any;
  ddd: any;

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private service: CepServiceService,
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

    this.navService.shouldDisplayLoggedMenu.next(true);

    this.routeUserNotLogged();

  }

  buscaCEP() {
      this.service.getCEP(this.cep).subscribe((data) => {
          this.cep = data.cep;
          this.logradouro = data.logradouro;
          this.localidade = data.localidade;
          this.bairro = data.bairro;
          this.uf = data.uf;
          this.ddd = data.ddd;
      });
  }
  blur(event: any) {
      this.buscaCEP();
  }
}
