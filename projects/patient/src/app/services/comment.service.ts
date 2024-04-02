import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private baseApeiUrl = environment.baseApeiUrl
private apiUrl = `${this.baseApeiUrl}api/moments/comments`

constructor(private http: HttpClient) {}

createComment(data: Comment) : Observable<Response<Comment>> {
  return this.http.post<>(this.apiUrl, data)
}

}
