import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lazy-loading',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lazy-loading.component.html',
  styleUrl: './lazy-loading.component.css'
})
export class LazyLoadingComponent {
  advantages = [
    { title: 'Bundle Initial', description: 'Réduction du bundle initial' },
    { title: 'Chargement', description: 'Temps de chargement initial plus rapide' },
    { title: 'À la demande', description: 'Chargement à la demande' },
    { title: 'Performance', description: 'Meilleure performance globale' },
    { title: 'Bande passante', description: 'Optimisation de la bande passante' }
  ];

  benefits = [
    'Réduction du bundle initial',
    'Temps de chargement initial plus rapide',
    'Chargement à la demande',
    'Meilleure performance globale',
    'Optimisation de la bande passante'
  ];

  strategies = [
    {
      name: 'Route-level',
      description: 'Lazy loading par route',
      useCase: 'Composants standalone',
      example: 'loadComponent: () => import(\'./component\').then(m => m.Component)'
    },
    {
      name: 'Module-level',
      description: 'Lazy loading de modules entiers',
      useCase: 'Modules complets',
      example: 'loadChildren: () => import(\'./module\').then(m => m.Module)'
    }
  ];

  bundleOptimizations = [
    { technique: 'Code Splitting', title: 'Code Splitting', description: 'Diviser le code en chunks', impact: 'Élevé' },
    { technique: 'Tree Shaking', title: 'Tree Shaking', description: 'Supprimer le code mort', impact: 'Moyen' },
    { technique: 'Minification', title: 'Minification', description: 'Réduire la taille des fichiers', impact: 'Élevé' },
    { technique: 'Compression', title: 'Compression', description: 'Compresser les assets', impact: 'Élevé' }
  ];

  preloadingStrategies = [
    { name: 'NoPreloading', description: 'Pas de préchargement (par défaut)', useCase: 'Par défaut' },
    { name: 'PreloadAllModules', description: 'Précharge tous les modules lazy', useCase: 'Améliorer UX' },
    { name: 'Custom Strategy', description: 'Stratégie personnalisée', useCase: 'Contrôle fin' }
  ];

  tips = [
    'Lazy load les feature modules',
    'Garder le bundle initial < 500 KB',
    'Utiliser PreloadAllModules pour améliorer UX',
    'Analyser les bundles avec webpack-bundle-analyzer',
    'Grouper les routes par fonctionnalité'
  ];
}
