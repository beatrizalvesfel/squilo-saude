import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NoteServiceService extends BaseService {

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

  noteList(userID: string){
    return this.http.get<any>(`${this.getBaseUrl()}/api/notes/${userID}`,this.httpOptions).pipe(take(1));
  }

  deleteNote(userID: string, noteID: string){
    return this.http.delete<any>(`${this.getBaseUrl()}/api/notes/${userID}/${noteID}`);
  }

  uploadNote( userID: string, titleNote: string, textNote: string) {

    const formData = new FormData();
    const body = { titleNote: titleNote, textNote: textNote};

    formData.append('data', JSON.stringify(body));
    return this.http.post<any>(`${this.getBaseUrl()}/api/notes/${userID}`, formData);
  }


  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }

}
