import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { metricsModel } from '../../models/metrics.model';
import { UserDetailModel } from '../../models/user-detail.model';
import { BaseService } from './base.service';
import { UserShare } from '../../models/user-share.model';
@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseService {

  constructor(private http: HttpClient, private httpClient: HttpClient) {
    super();
  }

  askDeleteAccount(userID: any): Observable<any>{
    const formData = new FormData();
    const body = { userID: userID };

    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/user/askdelete`, body, {observe: 'response'});
  }

  deleteAccount(verificationCode: any) : Observable<any> {
    return this.httpClient.delete<any>(`${this.getBaseUrl()}/api/user/delete/${verificationCode}`);
  }

  codeDeleteResend(userId: any) : Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/verification/user/delete/${userId}/resend`, null);
  }

  getName(): Observable<string> {
    return this.http.get<string>(`${this.getBaseUrl()}/api/user/nome`);
  }

  getMetrics(): Observable<metricsModel> {
    return this.http.get<metricsModel>(`${this.getBaseUrl()}/api/metrics`);
  }

  metricsList(): Observable<any> {
    return this.http.get<any>(`${this.getBaseUrl()}/api/metrics`).pipe(take(1));
  }

  atualizarMetricas(model: metricsModel): Observable<any> {
    return this.http.put<any>(`${this.getBaseUrl()}/api/metrics`, model);
  }

  uploadMetricsForm(bloodType: string, height: number, weight: number)
  {
    const formData = new FormData();
    const body = { bloodType: bloodType, height: height, weight: weight};
    return this.http.post(`${this.getBaseUrl()}/api/metrics`, body);
  }

  getEmail(): Observable<string> {
    return this.http.get<any>(`${this.getBaseUrl()}/api/user/email`);
  }

  buscarDetalhes(): Observable<UserDetailModel> {
    return this.http.get<UserDetailModel>(`${this.getBaseUrl()}/api/user/detail`);
  }

  atualizar(model: UserDetailModel): Observable<any> {
    return this.http.put(`${this.getBaseUrl()}/api/user`, model);
  }

  buscarFotoPerfil(): Observable<any> {
    return this.http.get<any>(`${this.getBaseUrl()}/api/user/picture`);
  }

  atualizarFotoPerfil(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<any>(`${this.getBaseUrl()}/api/user/picture`, formData);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }

  getAll(): Observable<UserShare[]> {
    return this.http.get<UserShare[]>(`${this.getBaseUrl()}/api/user`);
  }

}
