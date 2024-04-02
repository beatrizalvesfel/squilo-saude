import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProfilePicDialogComponent } from '../change-profile-pic-dialog/change-profile-pic-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';
import { NavServiceService } from '../../services/nav-service.service';
import { CookieServiceService } from '../../services/cookie-service.service';
import { PatientService } from '../../services/patient.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationModel } from '../../../models/notification.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  menuVariable : boolean = false
  menuIconVariable : boolean = false
  menuIconDeskVariable : boolean = false
  menuVariableDesktop: boolean = false
  year: any
  imageUrl: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  public notificationList!: NotificationModel[];
  notification: any = [];
  list: any = [];
  newNotification: boolean = false

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    public navService: NavServiceService,
    private cookieService: CookieServiceService,
    private patientService: PatientService,
    private notificationService: NotificationService,


    ) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.patientService.buscarFotoPerfil().subscribe((res: { imageUrl: string; }) => {
      this.imageUrl = res.imageUrl;
    })

    this.notificationService.getAll().subscribe(notification => {
      this.notificationList = notification;
      for (let i = 0; i < this.notificationList.length; i++) {
          this.list[i] = this.notificationList[i].meta
          if (this.notificationList[i].type === 'RECEIVED_EXAM' || this.notificationList[i].type === 'SENT_EXAM') {
            this.newNotification = true
        }
      }
    })

  }

  changeProfilePic() {
    const dialogRef = this.dialog.open(ChangeProfilePicDialogComponent, {
      width: '75%',
    }).afterClosed().subscribe((profileImageUrl: string) => {
      if(profileImageUrl) {
        this.imageUrl = profileImageUrl;
      }
    });
  }

  openMenu() {
    this.menuVariable =! this.menuVariable
    this.menuIconVariable =! this.menuIconVariable
  }

  closeMenu() {
    this.menuVariableDesktop =! this.menuVariableDesktop
    this.menuIconDeskVariable =! this.menuIconDeskVariable
  }

  logout(){
    this.authService.logout();
    this.cookieService.remove("token");
    this.navService.shouldDisplayLoggedMenu.next(false);
  }

}
