import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoaderService } from './../../services/loader.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { BasePage } from '../../services/base.page';
import { ExamServiceService } from '../../services/exam-service.service';
import { CookieServiceService } from '../../services/cookie-service.service';


@Component({
  selector: 'app-new-exam-dialog',
  templateUrl: './new-exam-dialog.component.html',
  styleUrls: ['./new-exam-dialog.component.scss']
})
export class NewExamDialogComponent extends BasePage implements OnInit{

  selectedFile: any;

  fileNames: any = [];
  file: any = []

  constructor(
    private examService: ExamServiceService,
    private formBuilder: FormBuilder,
    router: Router,
    cookieService: CookieServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewExamDialogComponent>,
    public loaderService: LoaderService
  ) {
    super(router, cookieService);
    this.examService.listen().subscribe((m: any)=> {
      this.refreshExamsList();
    })
  }
  ExamForm!: FormGroup;
  files!: Set<File>;
  examslist: any = []
  examsLength: any;
  dados: any = [];
  newExam = '';

  forms() {
    this.ExamForm = this.formBuilder.group(
      {
        examName: new FormControl('', Validators.required),
        examDescription: new FormControl,
        examFile: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
      },
    );
  }

  sendExam() {
    if (this.ExamForm.valid) {
      const files = this.uploader.queue.map(fileItem => fileItem._file);
      this.examService.uploadForms(files, this.ExamForm.value.examName, this.ExamForm.value.examDescription, this.ExamForm.value.date)
        .subscribe({
          next: (user) =>
            Swal.fire({
              title: 'Sucesso!!',
              text: 'Exame cadastrado com sucesso.',
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

  myFiles: string[] = [];

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

  }

  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:4200/api/exam/",
    disableMultipart: true,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment',
  });

  public onFileSelected(event: EventEmitter<File[]> | any) {
    this.files = new Set();
    for (let a = 0; a < event.length; a++) {
      const selectedFiles = <FileList>event[a];
      this.file.push(selectedFiles)
    }
    this.files.add(this.file);

  }

  ngOnInit(): void {
    this.refreshExamsList();
    this.forms()
  }

  cancel(): void {
    this.dialogRef.close();
  }

  close() {
    this.refreshExamsList();
    this.dialogRef.close();
  }

  refreshExamsList() {
    this.examService.examsList().subscribe(
      (data) => {
        this.dados = data
        this.examslist = this.dados
        if(this.examslist.length != 0) {
          this.examsLength = this.examslist.length
        } else {
          this.examsLength = 0
          this.refreshExamsList()
        }
      }
    )
  }
}
