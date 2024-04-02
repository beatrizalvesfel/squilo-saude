import { take } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BasePage } from '../../services/base.page';
import { LoaderService } from '../../services/loader.service';
import { NoteService } from '../../services/note.service';
import { CookieServiceService } from '../../services/cookie-service.service';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent extends BasePage implements OnInit {
  noteList: any = []
  dados: any = [];
  getNoteInfo: any = []
  dadosNote: any = [];
  id: any

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { noteID: string },
    public loaderService: LoaderService,
    public noteService: NoteService,
    router: Router,
    cookieService: CookieServiceService,
  ) {
    super(router, cookieService);
    this.noteService.listen().subscribe((m: any) => {
    this.refreshNoteList()
    })
  }

  EditNoteForm!: FormGroup;

  ngOnInit(): void {
    this.getNote(this.data.noteID)
    this.forms()
  }

  cancel(): void {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close();
    this.noteService.filter('Register click');
  }

  forms() {
    this.EditNoteForm = this.formBuilder.group(
      {
        title: new FormControl,
        text: new FormControl,
      },
    );
  }


  onSubmit() {
    this.noteService.updateNote(this.data.noteID,this.EditNoteForm.value.title, this.EditNoteForm.value.text)
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
        complete: () => this.refreshNoteList()
      })
  }

  refreshNoteList() {
    this.noteService.noteList();
    this.noteService.noteList().subscribe(
      (data) => {
        this.dados = data
        this.noteList = this.dados
      }
    )
  }

  getNote(noteID: any): void {
    this.noteService.note(noteID).subscribe(
      (data) => {
        this.dadosNote = data
        this.getNoteInfo = this.dadosNote
        this.EditNoteForm.patchValue({
          title: data.title
        });
        this.EditNoteForm.patchValue({
          text: data.text
        });
        console.log(this.getNoteInfo)
      }
    )
  }
}
