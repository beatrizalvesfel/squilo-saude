import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../../../../patient/src/app/services/loader.service';
import { PatientService } from '../../../../../../patient/src/app/services/patient.service';
import { NavServiceService } from '../../../../../../patient/src/app/services/nav-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  constructor(
    public loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    public navService: NavServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MetricsDialogComponent>,

  ) {

  }

  metricsForm!: FormGroup;
  dados: any = [];
  getMetrics: any = []
  clicked = false;

  forms() {
    this.metricsForm = this.formBuilder.group(
      {
        weight: new FormControl,
        height: new FormControl,
        bloodType: new FormControl,

      },
    );
  }

  ngOnInit(): void {
    this.forms();
  }

  newMetrics() {

    const metrics =
    {
      weight: this.metricsForm.value.weight || "",
      height: this.metricsForm.value.height || "",
      bloodType: this.metricsForm.value.bloodType || "",
    }
    this.patientService.atualizarMetricas(metrics)
      .subscribe({
        next: (user) =>
          Swal.fire({
            title: 'Sucesso!!',
            text: 'Enviado com sucesso.',
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
        complete: () => console.log('complete')

      })
  }

  cancel(): void {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
    this.patientService.filter('Register click');
  }

  refreshMetrics(){
    this.patientService.metricsList().subscribe(
      (data) => {
        this.dados = data
        this.getMetrics = this.dados
      }
    )
  }

}
