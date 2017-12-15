import { TestBed, inject } from '@angular/core/testing';

import { GlobalshareService } from './globalshare.service';

describe('GlobalshareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalshareService]
    });
  });

  it('should ...', inject([GlobalshareService], (service: GlobalshareService) => {
    expect(service).toBeTruthy();
  }));
});
