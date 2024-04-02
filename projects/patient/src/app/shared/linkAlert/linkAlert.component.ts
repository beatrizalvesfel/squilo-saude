import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-linkAlert',
  templateUrl: './linkAlert.component.html',
  styleUrls: ['./linkAlert.component.css']
})
export class LinkAlertComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);

  constructor() { }

  ngOnInit() {
  }

}
