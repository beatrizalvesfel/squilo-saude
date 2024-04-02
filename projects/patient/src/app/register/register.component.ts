import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';
import { RegisterService } from '../services/register.service';
import { CookieServiceService } from '../services/cookie-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.componentcopy.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  isPasswordSame: boolean | undefined;

  disableSaveButton: boolean = false;
  buttonText: string = "Cadastrar";

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    public loaderService: LoaderService,
    private cookieService: CookieServiceService
  ) { }

  registerForm = this.formBuilder.group(
    {
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      termos: new FormControl('', [
        Validators.required,
      ]),
      userType: new FormControl('', [
        Validators.required,
      ]),
      password: ['', Validators.compose([Validators.required]),],
      confirmPassword: ['', Validators.compose([Validators.required]),],
    },
    { validators: this.matchValidator('password', 'confirmPassword'), }
  );

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      } else {
        matchingControl.setErrors(null);
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      }
    };
  }

  onSubmit() {
    this.buttonText = "Processando ..."
    this.disableSaveButton = true;
    this.registerService.register(this.registerForm.value)
      .subscribe({
        next: (response) => Swal.fire({
          title: 'Bem-vindo!',
          text: 'Você receberá um código de confirmação, não esqueça de verificar também a caixa sua de span',
          imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
          imageWidth: 100,
          imageHeight: 70,
          imageAlt: 'Squilo',
        }).then(() => {
          this.cookieService.set('user-id', response.userID);
          this.router.navigate(['verification']);
        }),
        error: (e) => {
          this.buttonText = "Cadastrar";
          this.disableSaveButton = false;
          if (e.error.resultMessage === "usuário já existe") {
            Swal.fire({
              title: 'E-mail já cadastrado',
              text: "Este e-mail já está cadastrado, caso deseje recuperar sua senha clique em recuperar senha ",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Recuperar senha',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                // navegar recuperar senha
                this.router.navigate(['forgetpassword']);
              }
            })
          } else if (e.error.resultMessage === "usuário inativo") {
            this.buttonText = "Cadastrar";
            this.disableSaveButton = false;
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
                  this.router.navigate(['verification']);
                });
              }
            })
          } else {
            this.buttonText = "Cadastrar";
            this.disableSaveButton = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Ocorreu um erro inesperado, se o erro persistir entre em contato com o nosso suporte."
            })
          }
        },
        complete: () => console.info('complete')
      })
  }
}
