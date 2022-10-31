import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAppointmentComponent } from './details-appointment.component';

describe('DetailsAppointmentComponent', () => {
  let component: DetailsAppointmentComponent;
  let fixture: ComponentFixture<DetailsAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
