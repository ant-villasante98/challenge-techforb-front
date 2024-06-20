import { TestBed } from '@angular/core/testing';

import { ApiLoadService } from './api-load.service';

describe('ApiLoadService', () => {
  let service: ApiLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
