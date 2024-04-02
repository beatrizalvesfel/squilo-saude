import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCertificatesComponent } from './medical-certificates.component';

describe('MedicalCertificatesComponent', () => {
  let component: MedicalCertificatesComponent;
  let fixture: ComponentFixture<MedicalCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
