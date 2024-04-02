import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCertificatesComponent } from './share-certificates.component';

describe('ShareCertificatesComponent', () => {
  let component: ShareCertificatesComponent;
  let fixture: ComponentFixture<ShareCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
