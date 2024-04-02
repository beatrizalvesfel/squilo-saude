/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreRegistrationService } from './preRegistration.service';

describe('Service: PreRegistration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreRegistrationService]
    });
  });

  it('should ...', inject([PreRegistrationService], (service: PreRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
