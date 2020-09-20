import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminApartmentFormComponent } from './add-admin-apartment-form.component';

describe('AddAdminApartmentFormComponent', () => {
  let component: AddAdminApartmentFormComponent;
  let fixture: ComponentFixture<AddAdminApartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminApartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminApartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
