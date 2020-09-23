import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPricingPeriodDetailsComponent } from './admin-pricing-period-details.component';

describe('AdminPricingPeriodDetailsComponent', () => {
  let component: AdminPricingPeriodDetailsComponent;
  let fixture: ComponentFixture<AdminPricingPeriodDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPricingPeriodDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPricingPeriodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
