import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favorites-panel">
      <h3>
        <span class="icon">⭐</span>
        Villes favorites
      </h3>
      
      @if ((favorites$ | async)?.length === 0) {
        <p class="empty">
          <span>📍</span>
          Aucune ville favorite.<br>
          Cliquez sur ☆ pour ajouter une ville.
        </p>
      } @else {
        <ul class="favorites-list">
          @for (city of favorites$ | async; track city) {
            <li class="favorite-item">
              <button class="btn-city" (click)="selectCity(city)">
                <span class="city-icon">🏙️</span>
                {{ city }}
              </button>
              <button class="btn-remove" 
                      (click)="removeFavorite(city)"
                      title="Supprimer des favoris">
                ✕
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [`
    .favorites-panel {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 16px;
      font-size: 1.1rem;
      color: #1e293b;
    }
    
    .icon {
      font-size: 1.2rem;
    }
    
    .empty {
      text-align: center;
      color: #64748b;
      font-size: 0.9rem;
      padding: 20px 0;
      line-height: 1.6;
    }
    
    .empty span {
      display: block;
      font-size: 2rem;
      margin-bottom: 8px;
    }
    
    .favorites-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .favorite-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-city {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.95rem;
      color: #334155;
      text-align: left;
      transition: all 0.2s;
    }
    
    .btn-city:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
      transform: translateX(4px);
    }
    
    .city-icon {
      font-size: 1.1rem;
    }
    
    .btn-remove {
      padding: 8px 12px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      color: #94a3b8;
      font-size: 1rem;
      transition: all 0.2s;
    }
    
    .btn-remove:hover {
      background: #fef2f2;
      border-color: #fecaca;
      color: #dc2626;
    }
  `]
})
export class FavoritesComponent {
  private weatherService = inject(WeatherService);
  private favoritesService = inject(FavoritesService);
  
  favorites$ = this.favoritesService.favoriteCities$;
  
  selectCity(city: string): void {
    this.weatherService.searchCity(city);
  }
  
  removeFavorite(city: string): void {
    this.favoritesService.removeFavorite(city);
  }
}
