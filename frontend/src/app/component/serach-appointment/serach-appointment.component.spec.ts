import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachAppointmentComponent } from './serach-appointment.component';

describe('SerachAppointmentComponent', () => {
  let component: SerachAppointmentComponent;
  let fixture: ComponentFixture<SerachAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerachAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
