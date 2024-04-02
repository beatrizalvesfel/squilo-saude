import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { NavServiceService } from './nav-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient,
    private router: Router,
    public navService: NavServiceService

  ) {
    super();
  }


  signin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.getBaseUrl()}/auth/signin`, { email: email, password: password });
  }
  logout() {
    localStorage.clear();
    this.navService.shouldDisplayLoggedMenu.next(false);
    this.router.navigate(['login']);
  }


}
