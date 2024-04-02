import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterProfessionalDialogComponent } from './pre-register-professional-dialog.component';

describe('PreRegisterProfessionalDialogComponent', () => {
  let component: PreRegisterProfessionalDialogComponent;
  let fixture: ComponentFixture<PreRegisterProfessionalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRegisterProfessionalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreRegisterProfessionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
