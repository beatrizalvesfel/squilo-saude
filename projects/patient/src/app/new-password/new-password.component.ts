import { ForgetPasswordService } from './../services/forgetPassword.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  isPasswordSame: boolean | undefined;
  newPassForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loaderService: LoaderService,
    private forgetPasswordService:  ForgetPasswordService,

  ) { }

  form(){

  this.newPassForm = this.formBuilder.group(
    {
      password: ['', Validators.compose([Validators.required]),],
      confirmPassword: ['', Validators.compose([Validators.required]),],
    },
    { validators: this.matchValidator('password', 'confirmPassword'),  }
  );

}

  ngOnInit(): void {

    this.form()

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.activatedRoute.params.subscribe((params: any) => {
      window.localStorage.setItem( 'guid', params.guid)
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
      this.newPassForm.getError('mismatch') &&
      this.newPassForm.get('confirmPassword')?.touched
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
    const guid = window.localStorage.getItem('guid')
    this.forgetPasswordService.newPassword(this.newPassForm.value.password, guid)
    .subscribe({
      next: (response) => Swal.fire({
        title: 'Senha alterada com sucesso!',
        imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: 'Squilo',
      }).then(() => {
        this.router.navigate(['login']);
      }),
      error: (e) => {
          Swal.fire({
            title: 'Algo deu errado :/',
            text: "Tente novamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Recuperar senha',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['resetpassword']);
            }
          })
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
