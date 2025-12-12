import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherSearchComponent } from './components/weather-search.component';
import { WeatherDisplayComponent } from './components/weather-display.component';
import { FavoritesComponent } from './components/favorites.component';
import { WeatherForecastComponent } from './components/weather-forecast.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WeatherSearchComponent,
    WeatherDisplayComponent,
    FavoritesComponent,
    WeatherForecastComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  ngOnInit(): void {
    // Déclencher la première recherche pour charger Paris par défaut
    // Le service a déjà Paris comme valeur initiale
  }
  
  searchCity(city: string): void {
    this.weatherService.searchCity(city);
  }
}
