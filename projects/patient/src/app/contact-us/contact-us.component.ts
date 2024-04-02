import { PatientService } from './../services/patient.service';
import { LoaderService } from '../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contactService.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieServiceService } from '../services/cookie-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  userInfo: any = []
  dados: any = [];
  email: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private patientService: PatientService,
    private router: Router,
    public loaderService: LoaderService,
    private cookieService: CookieServiceService
  ) { }


  ContactForm!: FormGroup;

  forms() {
    this.ContactForm = this.formBuilder.group(
      {
        contactName: new FormControl('', Validators.required),
        contactEmail: new FormControl('', Validators.required),
        contactSubject: new FormControl('', Validators.required),
        contactMessage: new FormControl('', Validators.required),
      },

    );
  }


  onSubmit() {
    if (this.ContactForm.valid) {
      this.contactService.uploadContactForm(this.ContactForm.value.contactName, this.ContactForm.value.contactEmail, this.ContactForm.value.contactSubject, this.ContactForm.value.contactMessage)
      .subscribe({
        next: () =>
         Swal.fire({
          title: 'Sucesso!!',
          text: 'Email enviado com sucesso.',
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.forms();

    if (this.cookieService.isLogged()) {
      this.patientService.getEmail().subscribe(
        (data) => {
          this.dados = data
          this.email = this.dados.email
          this.ContactForm.get('contactEmail')?.setValue(this.email)
        }
        )
        this.patientService.getName().subscribe(
          (data) => {
            this.dados = data
            this.ContactForm.get('contactName')?.setValue(this.dados)
          }
          )
    }
  }
}
