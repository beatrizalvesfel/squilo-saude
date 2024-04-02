import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServiceService } from 'projects/patient/src/app/services/cookie-service.service';
import { RedeService } from '../services/rede.service';
import { BasePage } from 'projects/patient/src/app/services/base.page';
import { LoaderService } from '../../../../patient/src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rede',
  templateUrl: './rede.component.html',
  styleUrls: ['./rede.component.css']
})
export class RedeComponent extends BasePage implements OnInit {

  redeList: any = []

  redePatientsList: any = []

  redeProfessionalsList: any = []

  disableNetworkAddButton: boolean = false;
  buttonText: string = "Conectar";

  searchText = '';
  networklist: any = []

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public redeService: RedeService,
    public loaderService: LoaderService,

  ) {
    super(router, cookieService);
    this.redeService.listen().subscribe((m: any)=> {
      this.getNetworkAll();
    })
    this.redeService.listen().subscribe((m: any)=> {
      this.getNetworkPatients();
    })
    this.redeService.listen().subscribe((m: any)=> {
      this.getNetworkProfessionals();
    })
  }

  ngOnInit(): void {

    this.getNetworkAll()
    this.getNetworkPatients();
    this.getNetworkProfessionals();

    this.routeUserNotLogged();

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getNetworkAll() {
    this.redeService.getNetworkAll().subscribe(
      (data) => {
        this.redeList = data
      }
    )
  }

  getNetworkPatients() {
    this.redeService.getNetworkPatients().subscribe(
      (data) => {
        this.redePatientsList = data
      }
    )
  }

  getNetworkProfessionals() {
    this.redeService.getNetworkProfessionals().subscribe(
      (data) => {
        this.redeProfessionalsList = data
      }
    )
  }

  networkAdd(email: string) {
    // this.buttonText = "Processando ..."
    // this.disableNetworkAddButton = true;
    this.redeService.networkAdd(email)
    .subscribe({
      next: (response) => Swal.fire({
        title: 'Sucesso!!',
        text: 'Conectado com sucesso. Você já pode enviar exames para ele!',
        imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: 'Squilo',
      }).then(() => {
        this.getNetworkAll();
        this.getNetworkPatients();
        this.getNetworkProfessionals();
      }),
      error: (e) => {
          // this.disableNetworkAddButton = false;
          // this.buttonText = "Conectar"
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${e.error}`,
            footer: '<a href="">Qual o motivo do erro?</a>'
          })
      },
      complete: () => console.info('complete')
    })
}

}

