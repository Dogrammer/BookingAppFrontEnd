import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentComponent } from './admin-apartment.component';

describe('AdminApartmentComponent', () => {
  let component: AdminApartmentComponent;
  let fixture: ComponentFixture<AdminApartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
