import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, startWith, map, switchMap, of, debounceTime } from 'rxjs';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WeatherCardComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  locationControl = new FormControl('');
  locations: string[] = [];
  filteredLocations: Observable<string[]>;
  selectedLocations: any[] = [];

  constructor(private dashboardService: DashboardService) {
    this.filteredLocations = this.locationControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((value) => {
        if (value && value.length > 1) {
          return this.fetchLocations(value || '').pipe(
            map((locations) => {
              this.locations = locations;
              return this.locations;
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  ngOnInit(): void {
    this.dashboardService.getSelectedLocations().subscribe((locations) => {
      this.selectedLocations = locations;
    });
  }

  fetchLocations(query: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.dashboardService.fetchLocations(query).subscribe({
        next: (data: any[]) => {
          if (data && data.length > 0) {
            const locationNames = data.map((location: any) => location.name);
            this.locations = locationNames;
            observer.next(locationNames);
          } else {
            this.locations = [];
            console.log('No locations found');
            observer.next([]);
          }
          observer.complete();
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
          this.locations = [];
          observer.error(err);
        },
      });
    });
  }

  onLocationSelected(value: any) {
    if (!value) return;
    this.dashboardService.getCurrentDataByLocation(value).subscribe({
      next: (data) => {
        if (data && data.location && data.current) {
          const locationCurrentData = {
            city: `${data.location.name}`,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
          };
          this.dashboardService.pushSelectedLocation(locationCurrentData);
        }
      },
      error: (err) => {
        console.error('Failed to fetch location data:', err);
      },
    });
  }

  setSearchDefaultValue() {
    this.filteredLocations = of([]);
    this.locationControl.setValue('');
  }

  onViewDetails() {}
  onRemove() {}
}
