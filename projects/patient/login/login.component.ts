import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { CookieServiceService } from '../src/app/services/cookie-service.service';
import { LoaderService } from '../src/app/services/loader.service';
import { NavServiceService } from '../src/app/services/nav-service.service';
import { RegisterService } from '../src/app/services/register.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  hide = true;
  clicked = false;
  disableSaveButton: boolean = false;
  buttonText: string = "Entrar";

  constructor(private authentication: AuthenticationService, private formBuilder: FormBuilder, private router: Router,
    public loaderService: LoaderService, private registerService: RegisterService,
    public navService: NavServiceService,
    private cookieService: CookieServiceService

  ) { }

  loginForm = this.formBuilder.group(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: ['', Validators.compose([Validators.required])]
    }
  );

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  login() {
    this.buttonText = "Processando ..."
    this.disableSaveButton = true;
    this.authentication.signin(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe({
        next: (response) => {
          this.cookieService.set('user-id', response.body.userID);
          this.cookieService.set('token', response.body.token);
          this.cookieService.set('userType', response.body.userType);
          if (response.body.userType === "PACIENTE") {
            this.navService.shouldDisplayLoggedMenu.next(true);
            this.router.navigate(['main']);
          } else if (response.body.userType === "PROFISSIONAL") {
            // trocar assim q tiver a main de profissional
            // this.router.navigate(['professional']);
            this.router.navigate(['main']);
          } else if (response.body.userType === "CLINICA") {
            this.router.navigate(['clinic']);
          }
        },
        error: (e) => {
          console.log(e);
          if (e.error.resultMessage === "usuário inativo") {
            Swal.fire({
              title: 'Seu cadastro não foi finalizado',
              text: "Vimos que você não confirmou seu cadastro. Caso deseje ativá-lo. clique no botão ativar.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ativar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.cookieService.set('user-id', e.error.userID);
                this.registerService.reenviar(e.error.userID).subscribe(res => {
                  console.log(res);
                  this.router.navigate(['verification']);
                });
              }
            })
          }
          if (e.error.resultMessage === "E-mail incorreto") {
            this.disableSaveButton = false;
            this.buttonText = "Entrar"
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "E-mail incorreto"
            })
          } else if (e.error.resultMessage === "credenciais invalidas") {
            this.disableSaveButton = false;
            this.buttonText = "Entrar"
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Senha incorreta"
            })
          }
          else {
            this.disableSaveButton = false;
            this.buttonText = "Entrar"
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Verifique suas credenciais"
            })
          }

        },
        complete: () => console.info('complete')
      })
  }

}