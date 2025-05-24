import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

beforeEach(async () => {
  dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
    'getSelectedLocations',
    'fetchLocations',
    'getCurrentDataByLocation',
    'pushSelectedLocation',
  ]);
  await TestBed.configureTestingModule({
    imports: [DashboardComponent],
    providers: [{ provide: DashboardService, useValue: dashboardServiceSpy }],
  }).compileComponents();

  fixture = TestBed.createComponent(DashboardComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should set selectedLocations on ngOnInit', () => {
  const mockLocations = [{ city: 'Rome', temperature: 20, condition: 'Sunny' }];
  dashboardServiceSpy.getSelectedLocations.and.returnValue(of(mockLocations));
  component.ngOnInit();
  expect(component.selectedLocations).toEqual(mockLocations);
});

it('fetchLocations should update locations and emit names', (done) => {
  const mockData = [{ name: 'Rome' }, { name: 'Milan' }];
  dashboardServiceSpy.fetchLocations.and.returnValue(of(mockData));
  component.fetchLocations('Ro').subscribe((result) => {
    expect(result).toEqual(['Rome', 'Milan']);
    expect(component.locations).toEqual(['Rome', 'Milan']);
    done();
  });
});

it('fetchLocations should handle empty data', (done) => {
  dashboardServiceSpy.fetchLocations.and.returnValue(of([]));
  spyOn(console, 'log');
  component.fetchLocations('X').subscribe((result) => {
    expect(result).toEqual([]);
    expect(component.locations).toEqual([]);
    expect(console.log).toHaveBeenCalledWith('No locations found');
    done();
  });
});

it('fetchLocations should handle error', (done) => {
  const error = new Error('fail');
  dashboardServiceSpy.fetchLocations.and.returnValue({
    subscribe: ({ error: errFn }: any) => errFn(error),
  } as any);
  spyOn(console, 'error');
  component.fetchLocations('fail').subscribe({
    error: (err) => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching locations:',
        error
      );
      expect(component.locations).toEqual([]);
      done();
    },
  });
});

it('onLocationSelected should not call service if value is falsy', () => {
  component.onLocationSelected('');
  expect(dashboardServiceSpy.getCurrentDataByLocation).not.toHaveBeenCalled();
});

it('onLocationSelected should push selected location on valid data', () => {
  const value = 'Rome';
  const mockData = {
    location: { name: 'Rome' },
    current: { temp_c: 20, condition: { text: 'Sunny' } },
  };
  dashboardServiceSpy.getCurrentDataByLocation.and.returnValue(of(mockData));
  component.onLocationSelected(value);
  expect(dashboardServiceSpy.pushSelectedLocation).toHaveBeenCalledWith({
    city: 'Rome',
    temperature: 20,
    condition: 'Sunny',
  });
});

it('onLocationSelected should handle error', () => {
  const value = 'Rome';
  const error = new Error('fail');
  dashboardServiceSpy.getCurrentDataByLocation.and.returnValue({
    subscribe: ({ next, error: errFn }: any) => errFn(error),
  } as any);
  spyOn(console, 'error');
  component.onLocationSelected(value);
  expect(console.error).toHaveBeenCalledWith(
    'Failed to fetch location data:',
    error
  );
});

it('setSearchDefaultValue should reset filteredLocations and locationControl', () => {
  component.locationControl.setValue('Rome');
  component.setSearchDefaultValue();
  component.filteredLocations.subscribe((result) => {
    expect(result).toEqual([]);
  });
  expect(component.locationControl.value).toBe('');
});
