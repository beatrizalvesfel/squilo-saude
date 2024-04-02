import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionalUserComponent } from './update-professional-user.component';

describe('UpdateProfessionalUserComponent', () => {
  let component: UpdateProfessionalUserComponent;
  let fixture: ComponentFixture<UpdateProfessionalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfessionalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfessionalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
