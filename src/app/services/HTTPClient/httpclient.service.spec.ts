import { TestBed, inject } from '@angular/core/testing';

import { HTTPClientService } from './httpclient.service';

describe('HTTPClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HTTPClientService]
    });
  });

  it('should be created', inject([HTTPClientService], (service: HTTPClientService) => {
    expect(service).toBeTruthy();
  }));
});
