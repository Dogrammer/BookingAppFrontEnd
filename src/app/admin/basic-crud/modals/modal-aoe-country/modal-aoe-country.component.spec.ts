import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeCountryComponent } from './modal-aoe-country.component';

describe('ModalAoeCountryComponent', () => {
  let component: ModalAoeCountryComponent;
  let fixture: ComponentFixture<ModalAoeCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAoeCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
