import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getName();
  }

}
