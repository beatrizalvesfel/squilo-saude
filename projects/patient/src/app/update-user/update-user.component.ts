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

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BasePage } from '../services/base.page';
import { CepServiceService } from '../services/cep-service.service';
import { LoaderService } from '../services/loader.service';
import { PatientService } from '../services/patient.service';
import { ForgetPasswordService } from './../services/forgetPassword.service';
import { NavServiceService } from '../services/nav-service.service';
import { CookieServiceService } from '../services/cookie-service.service';
import { UserType } from '../../models/user-type.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent extends BasePage implements OnInit {
  cep: any;
  dados: any = [];
  perfilForm!: FormGroup;
  deleteForm!: FormGroup;
  newPassForm!: FormGroup;
  email: string | undefined;

  profissaoSelecionada: string | undefined;
  estadoSelecionada: string | undefined;

  userType!: UserType;

  isProfessional: boolean = false;

  private userId: any;

  hide = true;
  hide2 = true;
  isPasswordSame: boolean | undefined;

  forms() {
    this.perfilForm = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.required])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      sexoBiologico: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required])],
      cep: ['', Validators.compose([Validators.required])],
      logradouro: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      bairro: ['', Validators.compose([Validators.required])],
      uf: ['', Validators.compose([Validators.required])],
      localidade: ['', Validators.compose([Validators.required])],
      ddd: ['', Validators.compose([Validators.required])],
      occupation: [''],
      expertise: [''],
      stateProfessionalActing: [''],
      registrationBoard: ['']
    });
    this.deleteForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
    });
    this.newPassForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.compose([Validators.required]),],
        newPassword: ['', Validators.compose([Validators.required]),],
        confirmPassword: ['', Validators.compose([Validators.required]),],
      },
      { validators: this.matchValidator('newPassword', 'confirmPassword'),  }
    );

  }

  constructor(
    router: Router,
    cookieService: CookieServiceService,
    private service: CepServiceService,
    public loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private forgetPassword: ForgetPasswordService,
    public navService: NavServiceService
  ) {
    super(router, cookieService);
  }

  ngOnInit(): void {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.userType = this.cookieService.get('userType');

    if (this.userType == UserType.PROFISSIONAL) {
      this.isProfessional = true;
    }



    this.navService.shouldDisplayLoggedMenu.next(true);

    this.forms();

    this.routeUserNotLogged();

    this.patientService.buscarDetalhes().subscribe((detail) => {
      this.perfilForm.patchValue({
        nome: detail.nome,
      });
      this.perfilForm.patchValue({
        sexoBiologico: detail.sexoBiologico,
      });
      this.perfilForm.patchValue({
        celular: detail.celular,
      });
      this.perfilForm.patchValue({
        dataNascimento: detail.dataNascimento,
      });
      this.perfilForm.patchValue({
        logradouro: detail.logradouro,
      });
      this.perfilForm.patchValue({
        localidade: detail.localidade,
      });
      this.perfilForm.patchValue({
        bairro: detail.bairro,
      });
      this.perfilForm.patchValue({
        uf: detail.uf,
      });
      this.perfilForm.patchValue({
        ddd: detail.ddd,
      });
      this.perfilForm.patchValue({
        cep: detail.cep,
      });
      this.perfilForm.patchValue({
        numero: detail.numero,
      });
      this.perfilForm.patchValue({
        occupation: detail.occupation,
      });
      this.perfilForm.patchValue({
        expertise: detail.expertise,
      });
      this.perfilForm.patchValue({
        stateProfessionalActing: detail.stateProfessionalActing,
      });
      this.perfilForm.patchValue({
        registrationBoard: detail.registrationBoard,
      });

    });

    this.patientService.getName().subscribe((data) => {
      this.dados = data;
      this.perfilForm.get('fullname')?.setValue(this.dados);
    });

    this.patientService.getEmail().subscribe((data) => {
      this.dados = data;
      this.email = this.dados.email;
      this.deleteForm.get('email')?.setValue(this.email);
    });
  }

  buscaCEP(cep: any) {
    this.service.getCEP(cep).subscribe((data) => {
      this.cep = data.cep;
      this.perfilForm.patchValue({
        logradouro: data.logradouro,
      });
      this.perfilForm.patchValue({
        localidade: data.localidade,
      });
      this.perfilForm.patchValue({
        bairro: data.bairro,
      });
      this.perfilForm.patchValue({
        uf: data.uf,
      });
      this.perfilForm.patchValue({
        ddd: data.ddd,
      });
    });
  }
  blur(event: any) {
    this.buscaCEP(event.target.value);
  }

  onSubmit() {
    const userDetail = {
      dataNascimento: this.perfilForm.value.dataNascimento || '',
      cep: this.perfilForm.value.cep || '',
      celular: this.perfilForm.value.celular || '',
      nome: this.perfilForm.value.nome || '',
      ddd: this.perfilForm.value.ddd || '',
      localidade: this.perfilForm.value.localidade || '',
      logradouro: this.perfilForm.value.logradouro || '',
      bairro: this.perfilForm.value.bairro || '',
      numero: this.perfilForm.value.numero || '',
      uf: this.perfilForm.value.uf || '',
      sexoBiologico: this.perfilForm.value.sexoBiologico || '',
      occupation: this.perfilForm.value.occupation || '',
      expertise: this.perfilForm.value.expertise || '',
      stateProfessionalActing: this.perfilForm.value.stateProfessionalActing || '',
      registrationBoard: this.perfilForm.value.registrationBoard || ''
    };

    this.patientService.atualizar(userDetail).subscribe((res) => {
      Swal.fire('Pronto!', 'Seu perfil foi atualizado com sucesso!', 'success');
    });
  }

  askDeleteAccount() {
    this.userId = this.cookieService.get('user-id');
    Swal.fire({
      title: 'Deletar conta',
      text: 'Tem certeza? Está é uma ação sem volta 😕',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e1177',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Excluir conta',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          userID: this.userId,
        };
        this.patientService
          .askDeleteAccount(this.userId)
          .subscribe((response) => {
            this.router.navigate(['deleteaccount']);
          });
      }
    });
  }

  changePass() {
    this.userId = this.cookieService.get('user-id');
    this.forgetPassword.changePassword(this.newPassForm.value.oldPassword, this.newPassForm.value.newPassword, this.userId)  .subscribe({
      next: (response) => Swal.fire({
        title: 'Senha alterada com sucesso!',
        imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: 'Squilo',
      }),
      error: (e) => {
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

  checkNewPassword(controlName: string, matchingControlName: string) {
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

}
