import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService  {
constructor(private http: HttpClient) {
  super();
}

uploadContactForm(contactName: string, contactEmail: string, contactSubject: string, contactMessage: string) {
  const payload = {
    contactName: contactName,
    contactEmail: contactEmail,
    contactSubject: contactSubject,
    contactMessage: contactMessage
  }
  return this.http.post<any>(`${this.getBaseUrl()}/api/contact`, payload);
}
}
