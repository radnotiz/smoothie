import { TestBed } from '@angular/core/testing';

import { SlowService } from './slow.service';

describe('SlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlowService = TestBed.get(SlowService);
    expect(service).toBeTruthy();
  });
});
