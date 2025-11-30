import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-state-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './state-management.component.html',
  styleUrl: './state-management.component.css'
})
export class StateManagementComponent {
  approaches = [
    {
      name: 'Component State',
      description: 'État local dans le composant',
      useCase: 'État simple, pas de partage',
      tools: 'Propriétés de classe',
      complexity: 'Faible'
    },
    {
      name: 'Service with BehaviorSubject',
      description: 'État partagé via services',
      useCase: 'Partage entre composants',
      tools: 'BehaviorSubject, RxJS',
      complexity: 'Moyenne'
    },
    {
      name: 'Signals (Angular 16+)',
      description: 'Gestion d\'état réactive moderne',
      useCase: 'État réactif simplifié',
      tools: 'signal(), computed(), effect()',
      complexity: 'Faible'
    },
    {
      name: 'NgRx / Akita',
      description: 'State management avec Redux pattern',
      useCase: 'Applications complexes',
      tools: 'Store, Actions, Reducers',
      complexity: 'Élevée'
    }
  ];

  signalsAdvantages = [
    'Réactivité fine-grained',
    'Meilleure performance',
    'Pas de zone.js requis',
    'Plus simple que RxJS',
    'Interopérabilité avec RxJS'
  ];

  whenToUse = [
    { approach: 'Component State', when: 'État simple, UI-only' },
    { approach: 'Service + Subject', when: 'Partage entre quelques composants' },
    { approach: 'Signals', when: 'État réactif moderne, performance' },
    { approach: 'NgRx', when: 'Grande application, état complexe' }
  ];
}
