import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private readonly apiUrl = environment.API_ENDPOINT;
  private readonly apiKey = environment.weatherApiKey;

  constructor(private httpClient: HttpClient) {}

  getForecastByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json`;
    const params = {
      key: this.apiKey,
      q: city,
    };
    return this.httpClient.get(url, { params });
  }
}
