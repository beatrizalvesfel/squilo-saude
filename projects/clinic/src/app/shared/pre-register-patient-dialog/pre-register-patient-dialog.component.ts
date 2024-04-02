import { PreRegistrationService } from './../../services/preRegistration.service';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../patient/src/app/services/loader.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pre-register-patient-dialog',
  templateUrl: './pre-register-patient-dialog.component.html',
  styleUrls: ['./pre-register-patient-dialog.component.css']
})
export class PreRegisterPatientDialogComponent implements OnInit {
  preRegisterForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PreRegisterPatientDialogComponent>,
    private formBuilder: FormBuilder,
    public loaderService: LoaderService,
    public preRegistrationService: PreRegistrationService


  ) { }

  forms() {
    this.preRegisterForm = this.formBuilder.group(
      {
        patientName: new FormControl('', Validators.required),
        patientEmail: new FormControl('', Validators.required),
      },
    );
  }

  ngOnInit(): void {
    this.forms()

  }

  sendPatientPreRegistration() {
    if (this.preRegisterForm.valid) {
    this.preRegistrationService.patientPreRegistration(this.preRegisterForm.value.patientName,  this.preRegisterForm.value.patientEmail)
    .subscribe({
      next: (user) =>
       Swal.fire({
        title: 'Sucesso!!',
        text: 'O pré-cadastro do paciente foi realizado. Você já pode enviar exames para ele!',
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
