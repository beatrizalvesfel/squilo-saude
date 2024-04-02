import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfilePicDialogComponent } from './change-profile-pic-dialog.component';

describe('ChangeProfilePicDialogComponent', () => {
  let component: ChangeProfilePicDialogComponent;
  let fixture: ComponentFixture<ChangeProfilePicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProfilePicDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProfilePicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
