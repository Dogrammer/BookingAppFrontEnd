import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentDetailComponent } from './admin-apartment-detail.component';

describe('AdminApartmentDetailComponent', () => {
  let component: AdminApartmentDetailComponent;
  let fixture: ComponentFixture<AdminApartmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApartmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
