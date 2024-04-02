import { NoteService } from './../../services/note.service';
import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.css']
})
export class NewNoteDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewNoteDialogComponent>,
    public loaderService: LoaderService,
    public noteService: NoteService

  ) { }

  NoteForm!: FormGroup;
  clicked = false;

  ngOnInit(): void {
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
    this.NoteForm = this.formBuilder.group(
      {
        title: new FormControl,
        text: new FormControl,
      },
    );
  }

    newNote() {
    if (this.NoteForm.valid) {

      this.noteService.uploadNote(this.NoteForm.value.title,  this.NoteForm.value.text)
      .subscribe({
        next: (user) =>
         Swal.fire({
          title: 'Sucesso!!',
          text: 'Anotação cadastrada com sucesso.',
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

}
