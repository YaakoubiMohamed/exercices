// Modèles de données pour l'application météo

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  timestamp: Date;
}

export interface ForecastDay {
  date: Date;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface WeatherState {
  data: WeatherData | null;
  status: LoadingState;
  error: string | null;
}
