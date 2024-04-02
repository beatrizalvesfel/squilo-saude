import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../../../patient/src/app/services/authentication.service';
import { CookieServiceService } from '../../../../../patient/src/app/services/cookie-service.service';
import { NavServiceService } from '../../../../../patient/src/app/services/nav-service.service';
import { PatientService } from '../../../../../patient/src/app/services/patient.service';
import { ChangeProfilePicDialogComponent } from '../change-profile-pic-dialog/change-profile-pic-dialog.component';

@Component({
  selector: 'app-clinic-menu',
  templateUrl: './clinic-menu.component.html',
  styleUrls: ['./clinic-menu.component.scss']
})
export class ClinicMenuComponent implements OnInit {

  menuVariable : boolean = false
  menuIconVariable : boolean = false
  menuIconDeskVariable : boolean = false
  menuVariableDesktop: boolean = false
  year: any
  imageUrl: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    public navService: NavServiceService,
    private cookieService: CookieServiceService,
    private patientService: PatientService,

    ) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.patientService.buscarFotoPerfil().subscribe((res: { imageUrl: string; }) => {
      this.imageUrl = res.imageUrl;
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
