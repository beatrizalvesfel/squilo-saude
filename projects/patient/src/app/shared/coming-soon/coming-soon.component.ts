import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../../services/cookie-service.service';
import { RankService } from '../../services/rank.service';
import { LoaderService } from '../../services/loader.service';
import { BasePage } from '../../services/base.page';


@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent extends BasePage implements OnInit {

  starRating = 0;
  selected = 'option1';
  rating: any;

  @Input()
  selectedValue!: string;

    constructor(
      router: Router,
      cookieService: CookieServiceService,
      private formBuilder: FormBuilder,
      private rankService: RankService,
      public loaderService: LoaderService
    ) {
      super(router, cookieService);

    }

    RankForm!: FormGroup;

    forms() {
      this.RankForm = this.formBuilder.group(
        {
          rankFeature: new FormControl('', Validators.required),
          rating: new FormControl('', Validators.required),
          rankComment: new FormControl,
        },
      );
    }


    onSubmit() {

      if (this.RankForm.valid) {

        this.rankService.uploadRankForm( this.RankForm.value.rating, this.RankForm.value.rankFeature, this.RankForm.value.rankComment)
        .subscribe({
          next: (user) =>
           Swal.fire({
            title: 'Sucesso!!',
            text: 'Enviado com sucesso.',
            imageUrl: 'https://squilosaude.com.br/ws/media-library/79de7ba80a6f485782950f556dfcfa82/image-2.png',
            imageWidth: 100,
            imageHeight: 70,
            imageAlt: 'Squilo',
          }).then(() => {
            this.router.navigate(['main']);
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
    }
    ngOnInit(): void {
      this.forms();
      this.RankForm.patchValue({
        rankFeature: this.selectedValue
      });
      this.selected = this.selectedValue;
    }

  }
