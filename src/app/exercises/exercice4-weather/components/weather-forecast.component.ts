import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { ForecastDay } from '../models/weather.models';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, TemperaturePipe, DatePipe],
  template: `
    <div class="forecast-container">
      <h3>
        <span class="icon">📅</span>
        Prévisions
      </h3>
      
      @if (forecast$ | async; as forecast) {
        @if (forecast.length > 0) {
          <div class="forecast-grid">
            @for (day of forecast; track day.date) {
              <div class="forecast-card">
                <span class="day-name">{{ day.date | date:'EEE':'':'fr' }}</span>
                <span class="day-date">{{ day.date | date:'dd/MM' }}</span>
                <img [src]="getWeatherIcon(day.icon)" 
                     [alt]="day.description"
                     class="forecast-icon">
                <div class="temps">
                  <span class="temp-max">{{ day.tempMax | temperature }}</span>
                  <span class="temp-min">{{ day.tempMin | temperature }}</span>
                </div>
                <span class="description">{{ day.description }}</span>
              </div>
            }
          </div>
        } @else {
          <p class="no-forecast">Prévisions non disponibles</p>
        }
      }
    </div>
  `,
  styles: [`
    .forecast-container {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 20px;
      font-size: 1.1rem;
      color: #1e293b;
    }
    
    .icon {
      font-size: 1.2rem;
    }
    
    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 12px;
    }
    
    .forecast-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 8px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s;
    }
    
    .forecast-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .day-name {
      font-weight: 600;
      color: #1e293b;
      text-transform: capitalize;
    }
    
    .day-date {
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 8px;
    }
    
    .forecast-icon {
      width: 50px;
      height: 50px;
    }
    
    .temps {
      display: flex;
      gap: 8px;
      margin: 8px 0;
    }
    
    .temp-max {
      font-weight: 700;
      color: #1e293b;
    }
    
    .temp-min {
      color: #64748b;
    }
    
    .description {
      font-size: 0.75rem;
      color: #64748b;
      text-align: center;
      text-transform: capitalize;
    }
    
    .no-forecast {
      text-align: center;
      color: #94a3b8;
      padding: 20px;
    }
    
    @media (max-width: 600px) {
      .forecast-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class WeatherForecastComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  forecast$: Observable<ForecastDay[]> = of([]);
  
  ngOnInit(): void {
    // Récupère les prévisions quand les données météo changent
    this.forecast$ = this.weatherService.weatherData$.pipe(
      switchMap(data => {
        if (data) {
          return this.weatherService.getForecast(data.city);
        }
        return of([]);
      })
    );
  }
  
  getWeatherIcon(icon: string): string {
    return this.weatherService.getWeatherIcon(icon);
  }
}
