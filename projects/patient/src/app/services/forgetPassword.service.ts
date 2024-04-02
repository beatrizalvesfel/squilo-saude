import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  forgetPassworEmail( email: String){

    const body = { email: email};

    return this.http.post<any>(`${this.getBaseUrl()}/api/password/forget`, body);

  }

  newPassword ( password: String, guid: any ){
    const body = { password: password }
    return this.http.put(`${this.getBaseUrl()}/api/user/${guid}/resetpassword`, body);
  }

  changePassword ( oldPassword: String, newPassword: String, userID: any){
    const body = { oldPassword: oldPassword, newPassword: newPassword, userID: userID}
    return this.http.put(`${this.getBaseUrl()}/api/password/change`, body);
  }

}
