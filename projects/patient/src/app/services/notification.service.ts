import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationModel } from '../../models/notification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<NotificationModel[]>{
    return this.httpClient.get<NotificationModel[]>(`${this.getBaseUrl()}/api/notifications`);
  }

  markExamAsViewed(examID : any, userID: any) {
    return this.httpClient.post(`${this.getBaseUrl()}/api/share/exam/${examID}/viewed-by/${userID}`, null);
  }
}
