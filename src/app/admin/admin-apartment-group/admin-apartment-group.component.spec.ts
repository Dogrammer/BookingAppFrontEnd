import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentGroupComponent } from './admin-apartment-group.component';

describe('AdminApartmentGroupComponent', () => {
  let component: AdminApartmentGroupComponent;
  let fixture: ComponentFixture<AdminApartmentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApartmentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApartmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
