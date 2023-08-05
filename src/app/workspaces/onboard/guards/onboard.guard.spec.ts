import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onboardGuard } from './onboard.guard';

describe('onboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
