import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../../services/nav-service.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public navService: NavServiceService

  ) { }

  menuVariable : boolean = false
  menuIconVariable : boolean = false

  openMenu() {
    this.menuVariable =! this.menuVariable
    this.menuIconVariable =! this.menuIconVariable
  }
  ngOnInit(): void {
      this.navService.shouldDisplayLoggedMenu.next(false);
  }


}
