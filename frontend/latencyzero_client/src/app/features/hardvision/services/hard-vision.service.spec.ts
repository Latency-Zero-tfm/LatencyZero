import { TestBed } from '@angular/core/testing';

import { HardVisionService } from './hard-vision.service';

describe('HardVisionService', () => {
  let service: HardVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
