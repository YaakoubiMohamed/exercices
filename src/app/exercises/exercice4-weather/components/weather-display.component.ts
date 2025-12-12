import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { FavoritesService } from '../services/favorites.service';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { WeatherData } from '../models/weather.models';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, TemperaturePipe, DatePipe],
  template: `
    @if (state$ | async; as state) {
      <!-- État de chargement -->
      @if (state.status === 'loading') {
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Chargement des données météo...</p>
        </div>
      }
      
      <!-- État d'erreur -->
      @if (state.status === 'error') {
        <div class="error-container">
          <span class="error-icon">⚠️</span>
          <h3>Erreur</h3>
          <p>{{ state.error }}</p>
          <button (click)="retry()" class="btn-retry">
            Réessayer
          </button>
        </div>
      }
      
      <!-- Affichage des données -->
      @if (state.status === 'success' && state.data) {
        <div class="weather-card">
          <div class="location">
            <h2>{{ state.data.city }}</h2>
            <span class="country">{{ state.data.country }}</span>
            <button class="btn-favorite" 
                    (click)="toggleFavorite(state.data.city)"
                    [class.active]="isFavorite(state.data.city)"
                    [title]="isFavorite(state.data.city) ? 'Retirer des favoris' : 'Ajouter aux favoris'">
              {{ isFavorite(state.data.city) ? '⭐' : '☆' }}
            </button>
          </div>
          
          <div class="main-info">
            <img [src]="getWeatherIcon(state.data.icon)" 
                 [alt]="state.data.description"
                 class="weather-icon">
            <div class="temperature">
              {{ state.data.temperature | temperature }}
            </div>
          </div>
          
          <p class="description">{{ state.data.description }}</p>
          
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-icon">🌡️</span>
              <div class="detail-content">
                <span class="detail-label">Ressenti</span>
                <strong>{{ state.data.feelsLike | temperature }}</strong>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">💧</span>
              <div class="detail-content">
                <span class="detail-label">Humidité</span>
                <strong>{{ state.data.humidity }}%</strong>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">💨</span>
              <div class="detail-content">
                <span class="detail-label">Vent</span>
                <strong>{{ state.data.windSpeed | number:'1.1-1' }} m/s</strong>
              </div>
            </div>
          </div>
          
          <small class="timestamp">
            Mis à jour : {{ state.data.timestamp | date:'HH:mm - dd/MM/yyyy' }}
          </small>
        </div>
      }
    }
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #64748b;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-container {
      text-align: center;
      padding: 40px 20px;
      background: #fef2f2;
      border-radius: 16px;
      border: 1px solid #fecaca;
    }
    
    .error-icon {
      font-size: 3rem;
    }
    
    .error-container h3 {
      color: #dc2626;
      margin: 16px 0 8px;
    }
    
    .error-container p {
      color: #991b1b;
      margin-bottom: 20px;
    }
    
    .btn-retry {
      padding: 10px 24px;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s;
    }
    
    .btn-retry:hover {
      background: #b91c1c;
    }
    
    .weather-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 32px;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
      text-align: center;
    }
    
    .location {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .location h2 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }
    
    .country {
      font-size: 1.1rem;
      opacity: 0.8;
    }
    
    .btn-favorite {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s;
      line-height: 1;
    }
    
    .btn-favorite:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    
    .btn-favorite.active {
      animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
      50% { transform: scale(1.3); }
    }
    
    .main-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 16px;
    }
    
    .weather-icon {
      width: 120px;
      height: 120px;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
    }
    
    .temperature {
      font-size: 5rem;
      font-weight: 700;
      line-height: 1;
    }
    
    .description {
      font-size: 1.3rem;
      text-transform: capitalize;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 16px;
      margin-bottom: 20px;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    
    .detail-icon {
      font-size: 1.5rem;
    }
    
    .detail-content {
      text-align: center;
    }
    
    .detail-label {
      display: block;
      font-size: 0.85rem;
      opacity: 0.7;
      margin-bottom: 4px;
    }
    
    .detail-content strong {
      font-size: 1.1rem;
    }
    
    .timestamp {
      display: block;
      opacity: 0.6;
      font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
      .weather-card {
        padding: 24px 16px;
      }
      
      .temperature {
        font-size: 3.5rem;
      }
      
      .weather-icon {
        width: 80px;
        height: 80px;
      }
      
      .details-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .detail-item {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class WeatherDisplayComponent {
  private weatherService = inject(WeatherService);
  private favoritesService = inject(FavoritesService);
  
  state$ = this.weatherService.state$;
  
  isFavorite(city: string): boolean {
    return this.favoritesService.isFavorite(city);
  }
  
  toggleFavorite(city: string): void {
    this.favoritesService.toggleFavorite(city);
  }
  
  getWeatherIcon(icon: string): string {
    return this.weatherService.getWeatherIcon(icon);
  }
  
  retry(): void {
    this.weatherService.searchCity(this.weatherService.currentCity);
  }
}
