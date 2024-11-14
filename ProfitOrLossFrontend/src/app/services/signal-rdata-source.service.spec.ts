import { TestBed } from '@angular/core/testing';

import { SignalRDataSourceService } from './signal-rdata-source.service';

describe('SignalRDataSourceService', () => {
  let service: SignalRDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
