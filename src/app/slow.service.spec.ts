import { TestBed } from '@angular/core/testing';
import { SlowService } from './slow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('SlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SlowService = TestBed.get(SlowService);
    expect(service).toBeTruthy();
  });
});
