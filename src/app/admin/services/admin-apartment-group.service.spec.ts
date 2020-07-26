import { TestBed } from '@angular/core/testing';

import { AdminApartmentGroupService } from './admin-apartment-group.service';

describe('AdminApartmentGroupService', () => {
  let service: AdminApartmentGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApartmentGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
