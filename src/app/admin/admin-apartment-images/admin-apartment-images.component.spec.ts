import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentImagesComponent } from './admin-apartment-images.component';

describe('AdminApartmentImagesComponent', () => {
  let component: AdminApartmentImagesComponent;
  let fixture: ComponentFixture<AdminApartmentImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApartmentImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApartmentImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
