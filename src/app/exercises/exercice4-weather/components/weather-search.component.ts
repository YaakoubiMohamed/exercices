import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="search"
               [formControl]="searchControl"
               placeholder="Rechercher une ville..."
               autocomplete="off"
               class="search-input">
        
        @if (isSearching) {
          <span class="spinner">⏳</span>
        }
      </div>
      
      @if (searchControl.value && searchControl.value.length > 0 && searchControl.value.length < 2) {
        <small class="hint">Entrez au moins 2 caractères</small>
      }
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .search-icon {
      position: absolute;
      left: 16px;
      font-size: 1.2rem;
      pointer-events: none;
    }
    
    .search-input {
      width: 100%;
      padding: 14px 50px;
      font-size: 1.1rem;
      border: 2px solid #e2e8f0;
      border-radius: 50px;
      outline: none;
      transition: all 0.3s ease;
      background: white;
    }
    
    .search-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .search-input::placeholder {
      color: #94a3b8;
    }
    
    .spinner {
      position: absolute;
      right: 16px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .hint {
      display: block;
      text-align: center;
      margin-top: 8px;
      color: #64748b;
      font-size: 0.85rem;
    }
  `]
})
export class WeatherSearchComponent implements OnInit, OnDestroy {
  private weatherService = inject(WeatherService);
  private destroy$ = new Subject<void>();
  
  searchControl = new FormControl('');
  isSearching = false;
  
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query !== null && query.length >= 2),
      tap(() => this.isSearching = true)
    ).subscribe(city => {
      if (city) {
        this.weatherService.searchCity(city);
        // Reset après un court délai
        setTimeout(() => this.isSearching = false, 1000);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
