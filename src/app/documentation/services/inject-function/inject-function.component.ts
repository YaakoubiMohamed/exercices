import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inject-function',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inject-function.component.html',
  styleUrl: './inject-function.component.css'
})
export class InjectFunctionComponent {
  advantages = [
    'Plus concis que l\'injection par constructeur',
    'Peut être utilisé en dehors des constructeurs',
    'Meilleure composition de code',
    'Facilite les fonctions helper',
    'Compatible avec les functional components'
  ];

  useCases = [
    'Injection dans des propriétés de classe',
    'Utilisation dans des fonctions utilitaires',
    'Composition de services',
    'Guards et Resolvers fonctionnels',
    'Initialisation de données'
  ];

  limitations = [
    'Utilisable uniquement dans le contexte d\'injection',
    'Ne fonctionne pas dans les méthodes classiques',
    'Doit être appelé de manière synchrone',
    'Limité aux phases de construction/initialisation'
  ];
}
