/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataTransferServiceService } from './DataTransferService.service';

describe('Service: DataTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransferServiceService]
    });
  });

  it('should ...', inject([DataTransferServiceService], (service: DataTransferServiceService) => {
    expect(service).toBeTruthy();
  }));
});
