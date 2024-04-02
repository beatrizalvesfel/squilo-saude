import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { PatientService } from '../services/patient.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinkAlertComponent } from '../shared/linkAlert/linkAlert.component'
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../services/cookie-service.service';
import { Router } from '@angular/router';
import { BasePage } from '../services/base.page';
import { environment } from '../../environments/environment';
import { ShareService } from '../services/share.service';
import { UserShare } from '../../models/user-share.model';

export interface User {
  name: string;
}

@Component({
  selector: 'app-share-exam',
  templateUrl: './share-exam.component.html',
  styleUrls: ['./share-exam.component.css']
})
export class ShareExamComponent extends BasePage implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: any,
    private patientService: PatientService,
    private shareService: ShareService,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShareExamComponent>,
    cookieService: CookieServiceService,
    router: Router,

  ) {
    super(router, cookieService);
  }

  myControl = new FormControl<string | UserShare>('');
  options: UserShare[] = [];
  filteredOptions!: Observable<UserShare[]>;
  examName!: string;
  selectedUser!: UserShare;
  private userID: any;
  private ownerID: any;
  disableSaveButton: boolean = false;
  buttonText: string = "Compartilhar";

  ngOnInit() {
    this.userID = this.cookieService.get("user-id");
    this.patientService.getAll().subscribe(data => {
      this.options.push(...data);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.userName;
          return name ? this._filter(name as string) : this.options.slice();
          // const email = typeof value === 'string' ? value : value?.userEmail;
          // return email ? this._filter(email as string) : this.options.slice();
        }),
      );
    })
    this.shareService.getShareExam(this.data.examID, this.userID).subscribe(result => {
      this.examName = result.examName;
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  displayFn(user: UserShare): string {
    return user && user.userName ? user.userName : '';
  }

  private _filter(userName: string): UserShare[] {
    const filterValue = userName.toLowerCase();

    return this.options.filter(option => option.userName.toLowerCase().includes(filterValue));
  }

  public getSelectedUser(value: any) {
    this.selectedUser = value;
  }

  public share() {
    this.buttonText = "Processando ..."
    this.disableSaveButton = true;
    this.shareService.shareWith(this.selectedUser.userID, this.data.examID)
      .subscribe({
        next: (data) =>
          Swal.fire({
            title: 'Sucesso!!',
            text: 'Exame compartilhado com sucesso.',
            imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
            imageWidth: 100,
            imageHeight: 70,
            imageAlt: 'Squilo',
          }).then(() => {
            this.close();
          }),
        error: (e) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${e.error}`,
          footer: '<a href="">Qual o motivo do erro?</a>'
        }),
        complete: () => console.info('complete')
      })

  }

  public link() {
    this.userID = this.cookieService.get("user-id");
    this.shareService.viewExam(this.data.examID).subscribe(data => {
      let linkExam = `${environment.shareViewUrl}${this.data.examID}/${this.userID}?routingType=external`
      this.clipboard.copy(linkExam);
      this._snackBar.openFromComponent(LinkAlertComponent, {
        duration: 5000,
      });
    })
  }
}
