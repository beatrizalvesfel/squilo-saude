/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForgetPasswordService } from './forgetPassword.service';

describe('Service: ForgetPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgetPasswordService]
    });
  });

  it('should ...', inject([ForgetPasswordService], (service: ForgetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
