import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends BaseService  {
  [x: string]: any;

  constructor(private http: HttpClient) {
    super();
  }

  certificateList(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/certificate`).pipe(take(1));
  }

  deleteCertificate(certificateID: string){
    return this.http.delete<any>(`${this.getBaseUrl()}/api/certificate/${certificateID}`);
  }

  uploadForms(files: Set<File>, certificateName: string, certificateDescription: string, startDate: string, endDate: string) {

    const formData = new FormData();

    const body = { certificateName: certificateName, certificateDescription: certificateDescription, startDate: startDate, endDate: endDate};

    formData.append('data', JSON.stringify(body));
    files.forEach(file => formData.append('files', file, file.name))
    return this.http.post<any>(`${this.getBaseUrl()}/api/certificate`, formData);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }
}
