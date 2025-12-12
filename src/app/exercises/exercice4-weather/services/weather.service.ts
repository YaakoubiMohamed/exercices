import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, tap, shareReplay } from 'rxjs/operators';
import { WeatherData, ForecastDay, WeatherState } from '../models/weather.models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  
  // OpenWeatherMap API Configuration
  private readonly API_KEY = environment.openWeatherMapApiKey;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';
  
  // Subject pour la ville recherchée
  private cityQuerySubject = new BehaviorSubject<string>('Paris');
  
  // État de chargement
  private stateSubject = new BehaviorSubject<WeatherState>({
    data: null,
    status: 'idle',
    error: null
  });
  
  readonly state$ = this.stateSubject.asObservable();
  
  // Observable pour les données météo avec debounce
  readonly weatherData$: Observable<WeatherData | null> = this.cityQuerySubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => this.stateSubject.next({ 
      data: null, 
      status: 'loading', 
      error: null 
    })),
    switchMap(city => this.fetchWeather(city)),
    tap(data => {
      if (data) {
        this.stateSubject.next({ 
          data, 
          status: 'success', 
          error: null 
        });
      }
    }),
    catchError(error => {
      this.stateSubject.next({ 
        data: null, 
        status: 'error', 
        error: error.message 
      });
      return of(null);
    }),
    shareReplay(1)
  );
  
  /**
   * Recherche une ville
   */
  searchCity(city: string): void {
    if (city && city.trim().length >= 2) {
      this.cityQuerySubject.next(city.trim());
    }
  }
  
  /**
   * Récupère les données météo depuis OpenWeatherMap
   */
  private fetchWeather(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}/weather`;
    const params = {
      q: city,
      appid: this.API_KEY,
      units: 'metric',
      lang: 'fr'
    };
    
    return this.http.get<any>(url, { params }).pipe(
      map(response => this.transformResponse(response)),
      catchError(error => {
        console.error('Erreur météo:', error);
        if (error.status === 404) {
          throw new Error('Ville non trouvée');
        } else if (error.status === 401) {
          throw new Error('Clé API invalide. Vérifiez votre clé OpenWeatherMap.');
        }
        throw new Error('Erreur de connexion');
      })
    );
  }
  
  /**
   * Récupère les prévisions sur 5 jours depuis OpenWeatherMap
   */
  getForecast(city: string): Observable<ForecastDay[]> {
    const url = `${this.BASE_URL}/forecast`;
    const params = {
      q: city,
      appid: this.API_KEY,
      units: 'metric',
      lang: 'fr'
    };
    
    return this.http.get<any>(url, { params }).pipe(
      map(response => this.transformForecast(response)),
      catchError(error => {
        console.error('Erreur prévisions:', error);
        return of([]);
      })
    );
  }
  
  /**
   * Transforme la réponse de l'API OpenWeatherMap en WeatherData
   */
  private transformResponse(data: any): WeatherData {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date()
    };
  }
  
  /**
   * Transforme les données de prévision OpenWeatherMap
   * L'API renvoie des prévisions toutes les 3 heures, on prend une par jour
   */
  private transformForecast(data: any): ForecastDay[] {
    if (!data.list) return [];
    
    // Grouper par jour et prendre le milieu de journée (12h)
    const dailyMap = new Map<string, any>();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      const hour = date.getHours();
      
      // Prendre la prévision de 12h ou la première disponible pour chaque jour
      if (!dailyMap.has(dateKey) || (hour >= 11 && hour <= 14)) {
        dailyMap.set(dateKey, item);
      }
    });
    
    // Convertir en tableau et prendre les 5 premiers jours
    return Array.from(dailyMap.values())
      .slice(0, 5)
      .map((item: any) => ({
        date: new Date(item.dt * 1000),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        icon: item.weather[0].icon
      }));
  }
  
  /**
   * Obtient l'URL de l'icône météo
   */
  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
  
  /**
   * Obtient la ville actuelle
   */
  get currentCity(): string {
    return this.cityQuerySubject.value;
  }
}
