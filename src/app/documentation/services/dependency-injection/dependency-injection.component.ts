import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dependency-injection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dependency-injection.component.html',
  styleUrl: './dependency-injection.component.css'
})
export class DependencyInjectionComponent {
  providers = [
    { type: 'Class Provider', syntax: '{ provide: Service, useClass: ServiceImpl }', description: 'Fournit une classe' },
    { type: 'Value Provider', syntax: '{ provide: TOKEN, useValue: value }', description: 'Fournit une valeur' },
    { type: 'Factory Provider', syntax: '{ provide: TOKEN, useFactory: factory }', description: 'Fournit via une fonction' },
    { type: 'Existing Provider', syntax: '{ provide: TOKEN, useExisting: Service }', description: 'Alias vers un autre provider' }
  ];

  injectorHierarchy = [
    { level: 'Root', description: 'Injecteur racine (providedIn: \'root\')', scope: 'Toute l\'application' },
    { level: 'Module', description: 'Injecteur de module', scope: 'Module et ses composants' },
    { level: 'Component', description: 'Injecteur de composant', scope: 'Composant et ses enfants' },
    { level: 'Element', description: 'Injecteur d\'élément', scope: 'Élément spécifique' }
  ];

  benefits = [
    'Découplage des dépendances',
    'Testabilité (mock injection)',
    'Flexibilité et configuration',
    'Gestion automatique du cycle de vie',
    'Code plus maintenable'
  ];
}
