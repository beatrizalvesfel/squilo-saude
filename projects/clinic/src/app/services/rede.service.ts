import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from 'projects/patient/src/app/services/base.service'
import { Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedeService extends BaseService {
  [x: string]: any;


  constructor (private readonly http: HttpClient) {
    super()
  }

  getNetworkAll(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/clinic/all`);
  }

  getNetworkPatients(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/clinic/patients`);
  }

  getNetworkProfessionals(){
    return this.http.get<any>(`${this.getBaseUrl()}/api/clinic/professionals`);
  }


  networkAdd (email: string) {
    const body = { email }
    return this.http.post<any>(`${this.getBaseUrl()}​/api/clinic/add`, body)
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }

}
