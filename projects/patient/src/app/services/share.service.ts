import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExamModel } from '../../models/exam.model';
import { CertificateModel } from '../../models/certificate.model';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getShareExam(examID: string, userID: string) : Observable<ExamModel> {
    return this.httpClient.get<ExamModel>(`${this.getBaseUrl()}/api/share/exam/${userID}/${examID}`);
  }

  getExamName(examID: string) : Observable<any> {
    return this.httpClient.get(`${this.getBaseUrl()}/api/exam/${examID}`);
  }

  getcertificate(id: string) : Observable<CertificateModel> {
    return this.httpClient.get<CertificateModel>(`${this.getBaseUrl()}/api/certificate/${id}`);
  }

  shareWith(userID: string, examID: string): Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/share/exam/${userID}/${examID}`, null);
  }

  viewedBy(examID: string, userID: string): Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/share/exam/${examID}/viewed-by/${userID}`, null);
  }

  viewExam(examID: string): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseUrl()}/api/share/exam/${examID}`);
  }

  viewCertificate(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseUrl()}/api/share/certificate/${id}`);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }

}
