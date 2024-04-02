import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NotificationModel } from '../../models/notification.model';
import { CookieServiceService } from '../services/cookie-service.service';
import { BasePage } from '../services/base.page';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BasePage implements OnInit {

  exam: any = []
  dados: any = [];
  list: any = [];
  readNotification: boolean[] = []

  private userID: any;

  public notificationList!: NotificationModel[];

  constructor(
    private notificationService: NotificationService,
    router: Router,
    cookieService: CookieServiceService,
  ) {
    super(router, cookieService);
  }

  ngOnInit() {
    this.userID = this.cookieService.get("user-id");
    this.notificationService.getAll().subscribe(notification => {
      this.notificationList = notification;
      for (let i = 0; i < this.notificationList.length; i++) {
        this.list[i] = this.notificationList[i].meta
      }
      console.log(this.notificationList)
    })
  }

  markExamAsViewed(examID: any, userID: string) {
    this.notificationService.markExamAsViewed(examID, userID)
      .subscribe({
        next: () => this.router.navigate(['receivedexam'], {
          state: {
            response: { examID: examID, userID: userID },
          },
        }),
        error: (e) => {
          if (e.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Exame ou usuário não encontrado",
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ok',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Ocorreu um erro inesperado, se o erro persistir entre em contato com o nosso suporte."
            })
          }
        },
        complete: () => console.info('complete view exam')
      })
  }

  receivedExamViewed(examID: any, userID: string) {
    this.router.navigate(['receivedexam'], {
      state: {
        response: { examID: examID, userID: userID },
      },
  });
}

  sentExamViewed(examID: any) {
    this.router.navigate(['receivedexam'], {
      state: {
        response: { examID: examID, userID:this.userID },
      },
  });
}

  markExamAsViewedShare(examID: any) {
    this.notificationService.markExamAsViewed(examID, this.userID)
    .subscribe({
      next: () => this.router.navigate(['receivedexam'], {
        state: {
          response: { examID: examID, userID: this.userID },
        },
      }),
      error: (e) => {
        if (e.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Exame ou usuário não encontrado",
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ok',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ocorreu um erro inesperado, se o erro persistir entre em contato com o nosso suporte."
          })
        }
      },
      complete: () => console.info('complete view exam')
    })
}
}
