import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  register(payload: any) : Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/user`, payload);
  }

  verify(userId: any, verificationCode: any) : Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/verification/user/${userId}/${verificationCode}`, null);
  }

  reenviar(userId: any) : Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseUrl()}/api/verification/${userId}/resend`, null);
  }
}
