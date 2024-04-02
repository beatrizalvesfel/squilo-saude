import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountCodeComponent } from './delete-account-code.component';

describe('DeleteAccountCodeComponent', () => {
  let component: DeleteAccountCodeComponent;
  let fixture: ComponentFixture<DeleteAccountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccountCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
