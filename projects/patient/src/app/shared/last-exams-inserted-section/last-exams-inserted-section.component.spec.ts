import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastExamsInsertedSectionComponent } from './last-exams-inserted-section.component';

describe('LastExamsInsertedSectionComponent', () => {
  let component: LastExamsInsertedSectionComponent;
  let fixture: ComponentFixture<LastExamsInsertedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastExamsInsertedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastExamsInsertedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
