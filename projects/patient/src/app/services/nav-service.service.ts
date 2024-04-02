import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  public  shouldDisplayLoggedMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor() { }


}
