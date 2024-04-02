import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ExamModel } from '../../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService extends BaseService  {
  [x: string]: any;

  constructor(private http: HttpClient) {
    super();
  }

  getExam(examID: string) : Observable<ExamModel> {
    return this.http.get<ExamModel>(`${this.getBaseUrl()}/api/exam/${examID}`);
  }

  examsList(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/exam`).pipe(take(1));
  }

  deleteExam(examID: string){
    return this.http.delete<any>(`${this.getBaseUrl()}/api/exam/${examID}`);
  }

  uploadForms(files: File[], examName: string, examDescription: string, date: string) {

    const formData = new FormData();
    const body = { examName: examName, examDescription: examDescription, date: date};
    formData.append('data', JSON.stringify(body));
    files.forEach(file => formData.append('files', file, file.name))
    return this.http.post<any>(`${this.getBaseUrl()}/api/exam`, formData);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }
}
