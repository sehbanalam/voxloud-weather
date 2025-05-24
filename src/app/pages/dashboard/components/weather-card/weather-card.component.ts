import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationData } from '../../interfaces/location';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() location!: LocationData;

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router
  ) {}

  get icon(): string {
    const condition = this.location?.condition?.toLowerCase() || '';
    if (condition.includes('rain')) {
      return 'rainy';
    }
    if (condition.includes('sun')) {
      return 'sunny';
    }
    if (condition.includes('cloud')) {
      return 'cloudy';
    }
    return 'cloudy';
  }

  goToForecast(): void {
    this._router.navigate(['/forecast/' + this.location.city.toLowerCase()]);
  }

  removeLocation(): void {
    this._dashboardService.removeLocation(this.location);
  }
}
