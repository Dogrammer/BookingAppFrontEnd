import { TestBed } from '@angular/core/testing';

import { ApartmentGroupService } from './apartment-group.service';

describe('ApartmentGroupService', () => {
  let service: ApartmentGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
