import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {
  changeDetectionStrategies = [
    { name: 'Default', strategy: 'Default', description: 'Vérifie tout le tree à chaque event', performance: 'Moyenne', impact: 'Moyen' },
    { name: 'OnPush', strategy: 'OnPush', description: 'Vérifie uniquement si @Input change', performance: 'Excellente', impact: 'Haut' }
  ];

  optimizations = [
    {
      category: 'Change Detection',
      techniques: [
        'Utiliser OnPush strategy',
        'Utiliser trackBy dans *ngFor',
        'Éviter les fonctions dans les templates',
        'Utiliser async pipe',
        'Détacher la change detection si nécessaire'
      ]
    },
    {
      category: 'Bundle Size',
      techniques: [
        'Lazy loading des modules',
        'Tree shaking',
        'Minification et compression',
        'Supprimer les imports inutilisés',
        'Utiliser production mode'
      ]
    },
    {
      category: 'Rendering',
      techniques: [
        'Virtual scrolling pour grandes listes',
        'Utiliser ngIf au lieu de [hidden]',
        'Optimiser les images (lazy loading, formats modernes)',
        'Réduire la profondeur du DOM',
        'Utiliser CSS animations au lieu de JS'
      ]
    }
  ];

  optimizationTechniques = [
    { title: 'OnPush Strategy', description: 'Utiliser OnPush change detection', category: 'Change Detection', example: 'changeDetection: ChangeDetectionStrategy.OnPush' },
    { title: 'TrackBy', description: 'Utiliser trackBy dans les listes', category: 'Change Detection', example: '@for (item of items; track item.id)' },
    { title: 'Lazy Loading', description: 'Lazy loading des modules', category: 'Bundle Size', example: 'loadChildren: () => import(\'./module\')' },
    { title: 'Virtual Scrolling', description: 'Virtual scrolling pour grandes listes', category: 'Rendering', example: '<cdk-virtual-scroll-viewport>' },
    { title: 'Image Optimization', description: 'Optimiser les images', category: 'Assets', example: 'ngSrc, loading="lazy"' }
  ];

  performanceTools = [
    { name: 'Chrome DevTools', tool: 'Chrome DevTools', purpose: 'Profiling, Network, Performance', description: 'Outils natifs Chrome', usage: 'F12 → Performance tab' },
    { name: 'Angular DevTools', tool: 'Angular DevTools', purpose: 'Component tree, Change detection', description: 'Extension Angular', usage: 'Extension Chrome/Firefox' },
    { name: 'Lighthouse', tool: 'Lighthouse', purpose: 'Audit performance global', description: 'Audit automatique', usage: 'Chrome DevTools → Lighthouse' },
    { name: 'webpack-bundle-analyzer', tool: 'webpack-bundle-analyzer', purpose: 'Analyse des bundles', description: 'Visualisation bundles', usage: 'npm run build --stats-json' },
    { name: 'source-map-explorer', tool: 'source-map-explorer', purpose: 'Visualisation du bundle', description: 'Analyse source maps', usage: 'npx source-map-explorer dist/*.js' }
  ];

  tools = [
    { tool: 'Chrome DevTools', purpose: 'Profiling, Network, Performance' },
    { tool: 'Angular DevTools', purpose: 'Component tree, Change detection' },
    { tool: 'Lighthouse', purpose: 'Audit performance global' },
    { tool: 'webpack-bundle-analyzer', purpose: 'Analyse des bundles' },
    { tool: 'source-map-explorer', purpose: 'Visualisation du bundle' }
  ];

  bestPractices = [
    'Mesurer avant d\'optimiser',
    'OnPush par défaut pour tous les composants',
    'trackBy obligatoire dans les ngFor',
    'Lazy load tout ce qui n\'est pas critique',
    'Optimiser les images et assets',
    'Utiliser async pipe au lieu de subscribe'
  ];
}
