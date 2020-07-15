import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentGroupComponent } from './apartment-group.component';

describe('ApartmentGroupComponent', () => {
  let component: ApartmentGroupComponent;
  let fixture: ComponentFixture<ApartmentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
