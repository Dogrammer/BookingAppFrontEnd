import { TestBed } from '@angular/core/testing';

import { ApartmentListService } from './apartment-list.service';

describe('ApartmentListService', () => {
  let service: ApartmentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
