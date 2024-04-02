import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class RankService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }
  uploadRankForm(rating: any, rankFeature: string, rankComment: string): Observable<any> {
    return this.http.post<any>(`${this.getBaseUrl()}/api/rank`, { feature: rankFeature, score: rating, contactMessage: rankComment});
  }
}
