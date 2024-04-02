import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterPatientDialogComponent } from './pre-register-patient-dialog.component';

describe('PreRegisterPatientDialogComponent', () => {
  let component: PreRegisterPatientDialogComponent;
  let fixture: ComponentFixture<PreRegisterPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRegisterPatientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreRegisterPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
