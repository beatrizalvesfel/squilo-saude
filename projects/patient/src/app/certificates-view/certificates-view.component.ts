import { CertificateService } from './../services/certificate.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { CookieServiceService } from '../services/cookie-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { BasePage } from '../services/base.page';
import { ExamServiceService } from '../services/exam-service.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-certificates-view',
  templateUrl: './certificates-view.component.html',
  styleUrls: ['./certificates-view.component.css']
})
export class CertificatesViewComponent  extends BasePage implements OnInit {

  certificateUrl: any;
  id: any;
  certificateName: any
  endDate: any
  startDate: any = []

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    public certificateService: CertificateService,
    private shareService: ShareService,
    public examService: ExamServiceService,
    private clipboard: Clipboard,

    ) {
    super(router, cookieService);
     }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.routeUserNotLogged();

    this.activatedRoute.params.subscribe((params: any) => {
      this.shareService.getcertificate(params.id).subscribe(result => {
        this.certificateUrl = result.certificateUrl;
        this.certificateName = result.certificateName;
        this.endDate = result.endDate;
        this.startDate = result.startDate;
        this.id =  result.id
      });
    });


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
        let linkCertificate = `${environment.shareCertificateUrl}${id}`
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
