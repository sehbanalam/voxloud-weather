import { ForecastComponent } from './forecast.component';
import { ForecastService } from './services/forecast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let forecastServiceSpy: jasmine.SpyObj<ForecastService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeStub: any;

  beforeEach(() => {
    forecastServiceSpy = jasmine.createSpyObj('ForecastService', [
      'getForecastByCity',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeStub = {
      snapshot: {
        paramMap: { get: jasmine.createSpy().and.returnValue('Rome') },
      },
    };
    component = new ForecastComponent(routerSpy, routeStub, forecastServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cityName from route param and call getForecastByCity on ngOnInit', () => {
    spyOn(component, 'getForecastByCity');
    component.ngOnInit();
    expect(component.cityName).toBe('Rome');
    expect(component.getForecastByCity).toHaveBeenCalledWith('Rome');
  });

  it('should navigate to /dashboard when goToDashboard is called', () => {
    component.goToDashboard();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle empty city param gracefully', () => {
    routeStub.snapshot.paramMap.get.and.returnValue('');
    spyOn(component, 'getForecastByCity');
    component.ngOnInit();
    expect(component.cityName).toBe('');
    expect(component.getForecastByCity).toHaveBeenCalledWith('');
  });
});
