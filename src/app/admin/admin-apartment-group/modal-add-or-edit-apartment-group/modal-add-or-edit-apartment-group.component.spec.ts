import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrEditApartmentGroupComponent } from './modal-add-or-edit-apartment-group.component';

describe('ModalAddOrEditApartmentGroupComponent', () => {
  let component: ModalAddOrEditApartmentGroupComponent;
  let fixture: ComponentFixture<ModalAddOrEditApartmentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddOrEditApartmentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOrEditApartmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
