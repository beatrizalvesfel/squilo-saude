import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicalCerficateDialogComponent } from './new-medical-cerficate-dialog.component';

describe('NewMedicalCerficateDialogComponent', () => {
  let component: NewMedicalCerficateDialogComponent;
  let fixture: ComponentFixture<NewMedicalCerficateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMedicalCerficateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMedicalCerficateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
