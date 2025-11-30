import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ArchitectureLayer {
  title: string;
  description: string;
  elements: string[];
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css'
})
export class ArchitectureComponent {
  layers: ArchitectureLayer[] = [
    {
      title: 'Components & Templates',
      description: 'Couche de présentation (Vue)',
      elements: [
        'Composants : Classes TypeScript avec @Component',
        'Templates : HTML avec syntaxe Angular',
        'Directives : @if, @for, ngClass, ngStyle',
        'Data Binding : {{expression}}, [property], (event)'
      ]
    },
    {
      title: 'Services & Dependency Injection',
      description: 'Couche logique métier',
      elements: [
        'Services : Classes avec @Injectable',
        'Dependency Injection : Injection automatique',
        'Providers : Configuration des dépendances',
        'Hierarchical Injectors : Arbre d\'injection'
      ]
    },
    {
      title: 'Routing & Navigation',
      description: 'Gestion de la navigation',
      elements: [
        'Router : Configuration des routes',
        'Guards : Protection des routes',
        'Lazy Loading : Chargement à la demande',
        'Route Parameters : Paramètres dynamiques'
      ]
    },
    {
      title: 'Data Layer',
      description: 'Gestion des données',
      elements: [
        'HttpClient : Requêtes HTTP',
        'RxJS : Programmation réactive',
        'State Management : BehaviorSubject, Observable',
        'Forms : Reactive Forms et Template-driven'
      ]
    }
  ];
}
