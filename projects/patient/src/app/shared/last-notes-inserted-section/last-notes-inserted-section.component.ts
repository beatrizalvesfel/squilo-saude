import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BasePage } from '../../services/base.page';
import { CookieServiceService } from '../../services/cookie-service.service';
import { NavServiceService } from '../../services/nav-service.service';
import { LoaderService } from '../../services/loader.service';
import { NoteService } from '../../services/note.service';
import { NewNoteDialogComponent } from '../../notes/new-note-dialog/new-note-dialog.component';
import { EditNoteDialogComponent } from '../../notes/edit-note-dialog/edit-note-dialog.component';

@Component({
  selector: 'app-last-notes-inserted-section',
  templateUrl: './last-notes-inserted-section.component.html',
  styleUrls: ['./last-notes-inserted-section.component.scss']
})
export class LastNotesInsertedSectionComponent extends BasePage implements OnInit {

  noteList: any = []
  dados: any = [];
  active:boolean[]=[]
  NoteForm: any;
  constructor(
    router: Router,
    cookieService: CookieServiceService,
    public navService: NavServiceService,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public noteService: NoteService,
  ) {
    super(router, cookieService);
    this.noteService.listen().subscribe((m: any)=> {
      this.refreshNoteList()
    })
  }

  ngOnInit(): void {
    this.navService.shouldDisplayLoggedMenu.next(true);
    this.routeUserNotLogged();
    this.refreshNoteList()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addNote(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '80%',
    })
  }

  close() {
    this.noteService.filter('Register click');
  }

  deleteNote(noteID : any){
    Swal.fire({
      title: 'Você está prestes a deletar uma anotação',
      text: "Você tem certeza que quer deletar? Essa ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e1177',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Apagar anotação',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pronto!',
          'Anotação deletada',
          'success'
        )
        this.noteService.deleteNote(noteID).subscribe(
          sucess => this.refreshNoteList()
        )
      }
    })
  }

  openEditNote(noteID : any): void {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      width: '80%',
      data: {
        noteID: noteID
      }
    })
  }

  refreshNoteList(){
    this.noteService.noteList();
    this.noteService.noteList().subscribe(
      (data) => {
        this.dados = data
        this.noteList = this.dados
      }
      )
  }

}

