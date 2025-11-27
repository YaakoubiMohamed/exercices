import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Exercise {
  id: number;
  title: string;
  description: string;
  route: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  topics: string[];
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  exercises: Exercise[] = [
    {
      id: 1,
      title: 'Calculateur de Notes',
      description: 'Apprenez les signals, computed signals et le two-way binding',
      route: '/exercice1',
      difficulty: 'Débutant',
      topics: ['Signals', 'Computed', 'FormsModule', 'Two-way binding'],
      icon: ''
    },
    {
      id: 2,
      title: 'Gestionnaire de Tâches',
      description: 'Services injectables, architecture clean et nouveau control flow',
      route: '/exercice2',
      difficulty: 'Intermédiaire',
      topics: ['Services', 'Dependency Injection', '@for/@if', 'State Management'],
      icon: '✅'
    },
    {
      id: 3,
      title: 'E-Commerce',
      description: 'Reactive Forms, validation, architecture multi-composants',
      route: '/exercice3',
      difficulty: 'Avancé',
      topics: ['Reactive Forms', 'Validators', 'Input/Output', 'Pipes'],
      icon: '🛒'
    },
    {
      id: 4,
      title: 'Application Météo (À venir)',
      description: 'HttpClient, RxJS, toSignal() et gestion des états',
      route: '/exercice4',
      difficulty: 'Avancé',
      topics: ['HttpClient', 'RxJS', 'toSignal()', 'Interceptors'],
      icon: '🌐'
    },
    {
      id: 5,
      title: 'Authentification (À venir)',
      description: 'Guards, JWT, interceptors et directives personnalisées',
      route: '/exercice5',
      difficulty: 'Avancé',
      topics: ['Guards', 'JWT', 'Lazy Loading', 'Custom Directives'],
      icon: '🔐'
    },
    {
      id: 6,
      title: 'Formulaire de Facture',
      description: 'Manipulation de tableaux avec signals, calculs en cascade',
      route: '/exercice6',
      difficulty: 'Intermédiaire',
      topics: ['Signals', 'Arrays', 'Computed', 'Currency Pipe'],
      icon: '📄'
    }
  ];

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
