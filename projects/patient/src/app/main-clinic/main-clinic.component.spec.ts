/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainClinicComponent } from './main-clinic.component';

describe('MainClinicComponent', () => {
  let component: MainClinicComponent;
  let fixture: ComponentFixture<MainClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
