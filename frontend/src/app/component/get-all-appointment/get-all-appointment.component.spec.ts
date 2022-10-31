import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAppointmentComponent } from './get-all-appointment.component';

describe('GetAllAppointmentComponent', () => {
  let component: GetAllAppointmentComponent;
  let fixture: ComponentFixture<GetAllAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
