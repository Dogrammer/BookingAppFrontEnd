import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeUsersComponent } from './modal-aoe-users.component';

describe('ModalAoeUsersComponent', () => {
  let component: ModalAoeUsersComponent;
  let fixture: ComponentFixture<ModalAoeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAoeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
