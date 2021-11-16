import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsReceiverFormComponent } from './gps-receiver-form.component';

describe('GpsReceiverFormComponent', () => {
  let component: GpsReceiverFormComponent;
  let fixture: ComponentFixture<GpsReceiverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsReceiverFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsReceiverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
