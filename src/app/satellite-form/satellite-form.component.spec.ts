import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteFormComponent } from './satellite-form.component';

describe('SatelliteFormComponent', () => {
  let component: SatelliteFormComponent;
  let fixture: ComponentFixture<SatelliteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatelliteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
