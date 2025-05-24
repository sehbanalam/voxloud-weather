import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardComponent } from './weather-card.component';
import { DashboardService } from '../../services/dashboard.service';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DashboardService.removeLocation with location when removeLocation is called', () => {
    const dashboardService = TestBed.inject(DashboardService);
    component.location = { city: 'Rome', temperature: 20, condition: 'Sunny' };
    spyOn(dashboardService, 'removeLocation');
    component.removeLocation();
    expect(dashboardService.removeLocation).toHaveBeenCalledWith(
      component.location
    );
  });
});
