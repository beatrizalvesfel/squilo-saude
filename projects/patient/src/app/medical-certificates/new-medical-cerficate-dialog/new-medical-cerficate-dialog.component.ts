import { CertificateService } from './../../services/certificate.service';
import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-medical-cerficate-dialog',
  templateUrl: './new-medical-cerficate-dialog.component.html',
  styleUrls: ['./new-medical-cerficate-dialog.component.css']
})
export class NewMedicalCerficateDialogComponent implements OnInit {

  constructor(
    private certificateService: CertificateService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewMedicalCerficateDialogComponent>,
    public loaderService: LoaderService
  ) { }

  selectedFile: any;
  fileNames: any = [];
  certificateForm!: FormGroup;
  files!: Set<File>;
  newCertificate = ''


  ngOnInit(): void {
    this.forms()
  }

  forms() {
    this.certificateForm = this.formBuilder.group(
      {
        certificateName: new FormControl('', Validators.required),
        certificateDescription: new FormControl,
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        certificateFile: new FormControl('', Validators.required),

      },

    );
  }

  onSubmit() {
    if (this.certificateForm.valid) {

      this.certificateService.uploadForms(this.files, this.certificateForm.value.certificateName, this.certificateForm.value.certificateDescription, this.certificateForm.value.startDate, this.certificateForm.value.endDate)
      .subscribe({
        next: (user) =>
         Swal.fire({
          title: 'Sucesso!!',
          text: 'Atestado/Laudo cadastrado com sucesso.',
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

  myFiles:string [] = [];

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;

    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      this.fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
  }
}

  cancel(): void {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close();
    this.certificateService.filter('Register click');
  }



}
