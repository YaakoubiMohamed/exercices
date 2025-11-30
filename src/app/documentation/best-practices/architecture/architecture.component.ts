import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css'
})
export class ArchitectureComponent {
  folderStructure = [
    { name: 'core/', description: 'Services singleton, guards, interceptors', content: 'Services, guards, interceptors' },
    { name: 'shared/', description: 'Composants, directives, pipes réutilisables', content: 'Composants, directives, pipes' },
    { name: 'features/', description: 'Modules fonctionnels de l\'application', content: 'Modules fonctionnels' },
    { name: 'models/', description: 'Interfaces et types TypeScript', content: 'Interfaces, types' },
    { name: 'services/', description: 'Services métier spécifiques', content: 'Services métier' }
  ];

  architecturePrinciples = [
    { title: 'Separation of Concerns (SoC)', description: 'Séparer les responsabilités en modules distincts' },
    { title: 'Single Responsibility Principle (SRP)', description: 'Chaque module a une seule responsabilité' },
    { title: 'Don\'t Repeat Yourself (DRY)', description: 'Éviter la duplication de code' },
    { title: 'Keep It Simple, Stupid (KISS)', description: 'Privilégier la simplicité' },
    { title: 'Dependency Injection', description: 'Injecter les dépendances plutôt que les créer' }
  ];

  moduleTypes = [
    { type: 'Core Module', purpose: 'Services singleton, configuration globale', imports: 'AppModule uniquement' },
    { type: 'Shared Module', purpose: 'Composants/pipes/directives réutilisables', imports: 'Feature modules' },
    { type: 'Feature Modules', purpose: 'Fonctionnalités métier', imports: 'Routes lazy-loaded' }
  ];

  bestPractices = [
    'Organiser par fonctionnalité (feature folders)',
    'Utiliser standalone components (Angular moderne)',
    'Lazy load les feature modules',
    'Centraliser la logique métier dans les services',
    'Garder les composants simples (smart vs dumb)'
  ];
}
