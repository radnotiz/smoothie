import { TestBed } from '@angular/core/testing';

import { CacheService, CACHE_SIZE_LIMIT } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: CACHE_SIZE_LIMIT, useValue: 3 }
    ]
  }));

  it('should be created', () => {
    const service: CacheService<number, number> = TestBed.get(CacheService);
    expect(service).toBeTruthy();
  });
});
