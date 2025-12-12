import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'weather-favorites';
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  
  readonly favoriteCities$ = this.favoritesSubject.asObservable();
  
  constructor() {
    this.loadFavorites();
  }
  
  /**
   * Ajoute une ville aux favoris
   */
  addFavorite(city: string): void {
    const normalizedCity = this.normalizeCity(city);
    const currentFavorites = this.favoritesSubject.value;
    
    if (!this.isFavorite(city)) {
      this.favoritesSubject.next([...currentFavorites, normalizedCity]);
      this.saveFavorites();
    }
  }
  
  /**
   * Supprime une ville des favoris
   */
  removeFavorite(city: string): void {
    const normalizedCity = this.normalizeCity(city);
    const currentFavorites = this.favoritesSubject.value;
    
    this.favoritesSubject.next(
      currentFavorites.filter(f => this.normalizeCity(f) !== normalizedCity)
    );
    this.saveFavorites();
  }
  
  /**
   * Vérifie si une ville est dans les favoris
   */
  isFavorite(city: string): boolean {
    const normalizedCity = this.normalizeCity(city);
    return this.favoritesSubject.value.some(
      f => this.normalizeCity(f) === normalizedCity
    );
  }
  
  /**
   * Bascule l'état favori d'une ville
   */
  toggleFavorite(city: string): void {
    if (this.isFavorite(city)) {
      this.removeFavorite(city);
    } else {
      this.addFavorite(city);
    }
  }
  
  /**
   * Obtient le nombre de favoris
   */
  get favoriteCount(): number {
    return this.favoritesSubject.value.length;
  }
  
  /**
   * Normalise le nom de la ville pour la comparaison
   */
  private normalizeCity(city: string): string {
    return city.trim().toLowerCase();
  }
  
  /**
   * Sauvegarde les favoris dans le LocalStorage
   */
  private saveFavorites(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY, 
        JSON.stringify(this.favoritesSubject.value)
      );
    } catch (error) {
      console.error('Erreur sauvegarde favoris:', error);
    }
  }
  
  /**
   * Charge les favoris depuis le LocalStorage
   */
  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const favorites = JSON.parse(stored);
        if (Array.isArray(favorites)) {
          this.favoritesSubject.next(favorites);
        }
      }
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
      this.favoritesSubject.next([]);
    }
  }
}
