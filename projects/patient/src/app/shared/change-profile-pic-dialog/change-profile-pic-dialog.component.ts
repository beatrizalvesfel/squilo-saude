import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-change-profile-pic-dialog',
  templateUrl: './change-profile-pic-dialog.component.html',
  styleUrls: ['./change-profile-pic-dialog.component.css']
})
export class ChangeProfilePicDialogComponent implements OnInit {

  file: any;
  userID: string = "";
  imageUrl = "";

  constructor(public dialogRef: MatDialogRef<ChangeProfilePicDialogComponent>,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.userID = window.localStorage.getItem("user-id") || "";
  }

  cancel(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close(this.imageUrl);
  }

  onChange(fileInput: any) {
    this.file = fileInput.files[0];
  }

  salvarFoto() {
    this.patientService.atualizarFotoPerfil(this.file).subscribe(res => {
      this.imageUrl = res.imageUrl;
      Swal.fire(
        'Pronto!',
        'Foto alterada',
        'success'
      );
      this.dialogRef.close(this.imageUrl);
    })
  }

}
