import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Version {
  version: string;
  year: number;
  name: string;
  highlights: string[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  versions: Version[] = [
    {
      version: 'AngularJS 1.0',
      year: 2010,
      name: 'Genesis',
      highlights: [
        'Premier framework par Google',
        'Two-way data binding révolutionnaire',
        'Directives et dependency injection'
      ]
    },
    {
      version: 'Angular 2',
      year: 2016,
      name: 'Réécriture Complète',
      highlights: [
        'Passage à TypeScript',
        'Architecture component-based',
        'Meilleure performance et modularité'
      ]
    },
    {
      version: 'Angular 4-8',
      year: 2017-2019,
      name: 'Évolution Continue',
      highlights: [
        'Angular CLI amélioré',
        'Ivy rendering engine (v9)',
        'Amélioration bundle size et performance'
      ]
    },
    {
      version: 'Angular 9-12',
      year: 2020-2021,
      name: 'Ivy Mature',
      highlights: [
        'Ivy par défaut',
        'Strict mode',
        'Webpack 5 support'
      ]
    },
    {
      version: 'Angular 13-15',
      year: 2021-2022,
      name: 'Modernisation',
      highlights: [
        'Suppression View Engine',
        'Standalone Components (v14)',
        'Typed Forms (v14)'
      ]
    },
    {
      version: 'Angular 16-17',
      year: 2023,
      name: 'Renaissance',
      highlights: [
        'Signals (v16)',
        'Nouveau Control Flow (v17)',
        'Deferrable Views'
      ]
    },
    {
      version: 'Angular 18-20',
      year: 2024-2025,
      name: 'Moderne',
      highlights: [
        'Signals matures',
        'Zoneless par défaut',
        'Performance optimale'
      ]
    }
  ];
}
