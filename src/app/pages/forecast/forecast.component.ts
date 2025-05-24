import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastData } from './interfaces/forecastData';
import { CommonModule } from '@angular/common';
import { ForecastService } from './services/forecast.service';
import { PageLoaderComponent } from '../../core/components/page-loader/page-loader.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  imports: [CommonModule, PageLoaderComponent],
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  isLoading: boolean = true;
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
        this.forecastData = response;
        this.isLoading = false;
      });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
