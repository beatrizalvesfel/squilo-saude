import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNotesInsertedSectionComponent } from './last-notes-inserted-section.component';

describe('LastNotesInsertedSectionComponent', () => {
  let component: LastNotesInsertedSectionComponent;
  let fixture: ComponentFixture<LastNotesInsertedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastNotesInsertedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastNotesInsertedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
