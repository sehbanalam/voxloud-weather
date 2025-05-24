import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocationData } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = environment.API_ENDPOINT;
  private readonly apiKey = environment.weatherApiKey;
  private readonly localStorageKey = 'selectedLocations';

  private selectedLocationsSubject: BehaviorSubject<LocationData[]>;

  selectedLocations$: Observable<LocationData[]>;

  constructor(private httpClient: HttpClient) {
    let initial: LocationData[] = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.localStorageKey);
      initial = stored ? JSON.parse(stored) : [];
    }
    this.selectedLocationsSubject = new BehaviorSubject<LocationData[]>(
      initial
    );
    this.selectedLocations$ = this.selectedLocationsSubject.asObservable();
  }

  private updateLocalStorage(locations: LocationData[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(locations));
    }
  }

  fetchLocations(query: string): Observable<any> {
    const url = `${this.apiUrl}/search.json`;
    const params = {
      key: this.apiKey,
      q: query,
    };
    return this.httpClient.get(url, { params });
  }

  getSelectedLocations(): Observable<LocationData[]> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          JSON.stringify(parsed) !==
          JSON.stringify(this.selectedLocationsSubject.value)
        ) {
          this.selectedLocationsSubject.next(parsed);
        }
      }
    }
    return this.selectedLocations$;
  }

  pushSelectedLocation(location: LocationData): void {
    const current = this.selectedLocationsSubject.value;
    if (!current.some((loc) => loc.city === location.city)) {
      const updated = [...current, location];
      this.selectedLocationsSubject.next(updated);
      this.updateLocalStorage(updated);
    }
  }

  removeLocation(location: LocationData): void {
    const current = this.selectedLocationsSubject.value;
    const updated = current.filter((loc) => loc.city !== location.city);
    this.selectedLocationsSubject.next(updated);
    this.updateLocalStorage(updated);
  }

  getCurrentDataByLocation(location: string): Observable<any> {
    const url = `${this.apiUrl}/current.json`;
    const params = {
      key: this.apiKey,
      q: location,
    };
    return this.httpClient.get(url, { params });
  }
}
