import { TestBed } from '@angular/core/testing';

import { AdminApartmentService } from './admin-apartment.service';

describe('AdminApartmentService', () => {
  let service: AdminApartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
