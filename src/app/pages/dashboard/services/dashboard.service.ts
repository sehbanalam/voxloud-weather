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
  private selectedLocationsSubject = new BehaviorSubject<LocationData[]>([]);
  selectedLocations$ = this.selectedLocationsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}


  fetchLocations(query: string): Observable<any> {
    const url = `${this.apiUrl}/search.json`;
    const params = {
      key: this.apiKey,
      q: query,
    };
    return this.httpClient.get(url, { params });
  }

  getSelectedLocations(): Observable<LocationData[]> {
    return this.selectedLocations$;
  }

  pushSelectedLocation(location: LocationData): void {
    const current = this.selectedLocationsSubject.value;
    if (!current.some((loc) => loc.city === location.city)) {
      this.selectedLocationsSubject.next([...current, location]);
    }
  }

  removeLocation(location: LocationData): void {
    const current = this.selectedLocationsSubject.value;
    const updated = current.filter((loc) => loc.city !== location.city);
    this.selectedLocationsSubject.next(updated);
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
