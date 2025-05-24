import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastData } from './interfaces/forecastData';
import { CommonModule } from '@angular/common';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  imports: [CommonModule],
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  cityName: string = '';
  forecastData: ForecastData | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _forecastService: ForecastService
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('city') || '';
    this.getForecastByCity(this.cityName);
  }

  getForecastByCity(city: string) {
    this._forecastService
      .getForecastByCity(this.cityName)
      .subscribe((response) => {
        console.log('Weather forecast:', response);
        this.forecastData = response;
      });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
