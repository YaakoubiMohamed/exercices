import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './guards.component.html',
  styleUrl: './guards.component.css'
})
export class GuardsComponent {
  guardTypes = [
    {
      type: 'CanActivate',
      name: 'CanActivate',
      description: 'Contrôle l\'accès à une route',
      useCase: 'Authentification, autorisation',
      returns: 'boolean | UrlTree | Observable | Promise'
    },
    {
      type: 'CanActivateChild',
      name: 'CanActivateChild',
      description: 'Contrôle l\'accès aux routes enfants',
      useCase: 'Protection de sections entières',
      returns: 'boolean | UrlTree | Observable | Promise'
    },
    {
      type: 'CanDeactivate',
      name: 'CanDeactivate',
      description: 'Contrôle la sortie d\'une route',
      useCase: 'Formulaires non sauvegardés',
      returns: 'boolean | Observable | Promise'
    },
    {
      type: 'CanLoad',
      name: 'CanLoad',
      description: 'Contrôle le lazy loading',
      useCase: 'Empêcher le téléchargement du module',
      returns: 'boolean | UrlTree | Observable | Promise'
    },
    {
      type: 'Resolve',
      name: 'Resolve',
      description: 'Pré-charge des données',
      useCase: 'Charger données avant activation',
      returns: 'T | Observable<T> | Promise<T>'
    }
  ];

  functionalGuards = [
    'canActivateFn',
    'canActivateChildFn',
    'canDeactivateFn',
    'canMatchFn',
    'resolveFn'
  ];

  bestPractices = [
    { title: 'Functional Guards', description: 'Utiliser des functional guards (Angular moderne)' },
    { title: 'Simplicité', description: 'Garder les guards simples et focalisés' },
    { title: 'Redirections', description: 'Retourner UrlTree pour redirections' },
    { title: 'Gestion d\'erreurs', description: 'Gérer les cas d\'erreur dans les guards' },
    { title: 'Injection', description: 'Utiliser inject() pour les dépendances' }
  ];
}
