import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamViewPdfComponent } from './exam-view-pdf.component';

describe('ExamViewPdfComponent', () => {
  let component: ExamViewPdfComponent;
  let fixture: ComponentFixture<ExamViewPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamViewPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
