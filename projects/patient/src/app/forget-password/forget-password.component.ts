import { ForgetPasswordService } from './../services/forgetPassword.service';
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
import { LoaderService } from '../services/loader.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public loaderService: LoaderService,
    private forgetPassService: ForgetPasswordService,
    private router: Router,

    ) { }

  forms() {

    this.forgetForm = this.formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
      },
    );
    }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.forms()

  }
  onSubmit() {
    this.forgetPassService.forgetPassworEmail(this.forgetForm.value.email)
    .subscribe({
      next: (response) => Swal.fire({
        title: 'Email enviado!',
        text: 'Verifique seu email para trocar a senha, não esqueça de verificar também a caixa sua de spam',
        imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: 'Squilo',
      }),
      error: (e) => {
          console.log(e);
          Swal.fire({
            title: 'Algo deu errado :/',
            text: "Tente novamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tentar novamente',
            cancelButtonText: 'Cancelar'
          }).then(() => {
              this.router.navigate(['forgetpassword']);
          })

      },
      complete: () => console.info('complete')
    })
  }

}
