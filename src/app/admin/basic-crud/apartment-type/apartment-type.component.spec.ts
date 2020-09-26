import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentTypeComponent } from './apartment-type.component';

describe('ApartmentTypeComponent', () => {
  let component: ApartmentTypeComponent;
  let fixture: ComponentFixture<ApartmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
