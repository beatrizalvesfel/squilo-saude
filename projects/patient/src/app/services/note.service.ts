import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { take } from 'rxjs/operators';
import { noteDetail } from '../../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  private token = window.localStorage.getItem("token") || ""

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    }),
  };


  note(noteID: string){
    return this.http.get<any>(`${this.getBaseUrl()}/api/note/${noteID}`);
  }

  noteList(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/note/`,this.httpOptions).pipe(take(1));
  }

  deleteNote(noteID: string){
    return this.http.delete<any>(`${this.getBaseUrl()}/api/note/${noteID}`);
  }

  updateNote(noteID: string,  title: string, text: string){
    const body = { title: title, text: text};
    return this.http.put(`${this.getBaseUrl()}/api/note/${noteID}`, body);
  }

  buscarNota(): Observable<noteDetail> {
    return this.http.get<noteDetail>(`${this.getBaseUrl()}/api/note`);
  }

  uploadNote( title: string, text: string) {

    const formData = new FormData();
    const body = { title: title, text: text};

    return this.http.post<any>(`${this.getBaseUrl()}/api/note/`, body);
  }


  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }

}
