import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { WeatherCardComponent } from './weather-card.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'removeLocation',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = new WeatherCardComponent(dashboardServiceSpy, routerSpy);
    component.location = {
      city: 'Rome',
      condition: 'Sunny',
      temperature: 25,
    } as any;
  });

  it('should call DashboardService.removeLocation with the location when removeLocation is called', () => {
    component.removeLocation();
    expect(dashboardServiceSpy.removeLocation).toHaveBeenCalledWith(
      component.location
    );
  });
});
