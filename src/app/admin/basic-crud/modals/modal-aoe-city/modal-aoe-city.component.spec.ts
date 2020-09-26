import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeCityComponent } from './modal-aoe-city.component';

describe('ModalAoeCityComponent', () => {
  let component: ModalAoeCityComponent;
  let fixture: ComponentFixture<ModalAoeCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAoeCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
