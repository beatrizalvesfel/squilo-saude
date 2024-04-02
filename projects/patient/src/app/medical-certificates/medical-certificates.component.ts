import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { CertificateService } from '../services/certificate.service';
import { LoaderService } from '../services/loader.service';
import { NavServiceService } from '../services/nav-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NewMedicalCerficateDialogComponent } from './new-medical-cerficate-dialog/new-medical-cerficate-dialog.component';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../services/cookie-service.service';
import { ShareService } from '../services/share.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-medical-certificates',
  templateUrl: './medical-certificates.component.html',
  styleUrls: ['./medical-certificates.component.scss']
})
export class MedicalCertificatesComponent extends BasePage implements OnInit {
  certificatelist: any = []
  dados: any = [];
  searchText = '';
  linkCertificate: any

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public navService: NavServiceService,
    private certificateService: CertificateService,
    private clipboard: Clipboard,
    private shareService: ShareService,

  ) {
    super(router, cookieService);
    this.certificateService.listen().subscribe((m: any)=> {
      console.log(m)
      this.refreshCertificateList()
    })
   }

   ngOnInit(): void {
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
    this.refreshCertificateList()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addCertificate(): void {
    const dialogRef = this.dialog.open(NewMedicalCerficateDialogComponent, {
      width: '80%',
    })
  }
  close() {
    this.certificateService.filter('Register click');
  }
  refreshCertificateList(){
    this.certificateService.certificateList().subscribe(
      (data) => {
        this.dados = data
        this.certificatelist = this.dados
      }
    )
  }

  deleteCertificate(id : any){
    Swal.fire({
      title: 'Você está prestes a deletar um atestado/laudo',
      text: "Você tem certeza que quer deletar? Essa ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e1177',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Apagar atestado/laudo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pronto!',
          'Exame deletado',
          'success'
        )
        this.certificateService.deleteCertificate(id).subscribe(
          sucess => this.refreshCertificateList()
        )
      }
    })
  }


  shareCertificate(id: String) {
    Swal.fire({
      title: 'Compartilhar documento',
      text: "Clique em confirmar para copiar o link",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e1177',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Copiar link',
      cancelButtonText: 'Cancelar'
    }).then((result)  => {
      if (result.isConfirmed) {
        if (environment.production) {
          let linkCertificate = `https://squilosaude.com.br/app/#/sharecertificate/${id}`
          this.clipboard.copy(linkCertificate);
          Swal.fire({
              title: 'O link para compartilhar o atestado/laudo está pronto!',
              input: 'text',
              inputValue: linkCertificate,
              icon: 'success',
              confirmButtonColor: '#7e1177',
              confirmButtonText: 'Confirmar'
            })
        } else {
          let linkCertificate = `http://localhost:4200/#/sharecertificate/${id}`
          this.clipboard.copy(linkCertificate);
          Swal.fire({
              title: 'O link para compartilhar exame está pronto!',
              input: 'text',
              inputValue: linkCertificate,
              icon: 'success',
              confirmButtonColor: '#7e1177',
              confirmButtonText: 'Copiar link'
            })
        }
      }
    })
  }

}
