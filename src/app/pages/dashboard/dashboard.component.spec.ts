import { of } from "rxjs";
import { DashboardComponent } from "./dashboard.component";

describe('DashboardComponent ngAfterViewInit', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    const dashboardServiceStub = {
      getSelectedLocations: jasmine
        .createSpy('getSelectedLocations')
        .and.returnValue(of([])),
      fetchLocations: jasmine
        .createSpy('fetchLocations')
        .and.returnValue(of([])),
      getCurrentDataByLocation: jasmine
        .createSpy('getCurrentDataByLocation')
        .and.returnValue(of({})),
      pushSelectedLocation: jasmine.createSpy('pushSelectedLocation'),
    };

    component = new DashboardComponent(dashboardServiceStub as any);
  });

  it('should call ngAfterViewInit without errors', () => {
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('should not change any state in ngAfterViewInit', () => {
    const initialLocations = [...component.locations];
    const initialSelectedLocations = [...component.selectedLocations];
    component.ngAfterViewInit();
    expect(component.locations).toEqual(initialLocations);
    expect(component.selectedLocations).toEqual(initialSelectedLocations);
  });
});
