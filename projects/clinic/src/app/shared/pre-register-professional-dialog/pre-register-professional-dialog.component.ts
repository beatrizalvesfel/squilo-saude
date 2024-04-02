import { PreRegistrationService } from './../../services/preRegistration.service';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../patient/src/app/services/loader.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pre-register-professional-dialog',
  templateUrl: './pre-register-professional-dialog.component.html',
  styleUrls: ['./pre-register-professional-dialog.component.css']
})
export class PreRegisterProfessionalDialogComponent implements OnInit {

  preRegisterForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PreRegisterProfessionalDialogComponent>,
    private formBuilder: FormBuilder,
    public loaderService: LoaderService,
    public preRegistrationService: PreRegistrationService


  ) { }

  forms() {
    this.preRegisterForm = this.formBuilder.group(
      {
        professionalName: new FormControl('', Validators.required),
        professionalEmail: new FormControl('', Validators.required),
      },
    );
  }

  ngOnInit(): void {
    this.forms()

  }

  sendProfessionalPreRegistration() {
    if (this.preRegisterForm.valid) {
    this.preRegistrationService.professionalPreRegistration(this.preRegisterForm.value.professionalName,  this.preRegisterForm.value.professionalEmail)
    .subscribe({
      next: (user) =>
       Swal.fire({
        title: 'Sucesso!!',
        text: 'O pré-cadastro do profissional foi realizado. Você já pode enviar exames para ele!',
        imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: 'Squilo',
      }).then(() => {
        this.close();
      }),
      error: (e) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${e.error}`,
        footer: '<a href="">Qual o motivo do erro?</a>'
      }),
      complete: () => console.info('complete')
    })
  }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
