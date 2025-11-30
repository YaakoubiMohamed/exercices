import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Tool {
  name: string;
  category: string;
  description: string;
  official: boolean;
  url: string;
}

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ecosystem.component.html',
  styleUrl: './ecosystem.component.css'
})
export class EcosystemComponent {
  tools: Tool[] = [
    {
      name: 'Angular CLI',
      category: 'Développement',
      description: 'Outil en ligne de commande pour créer, développer, tester et déployer des applications Angular',
      official: true,
      url: 'https://angular.dev/cli'
    },
    {
      name: 'Angular Material',
      category: 'UI Components',
      description: 'Bibliothèque de composants UI suivant le Material Design de Google',
      official: true,
      url: 'https://material.angular.io'
    },
    {
      name: 'Angular Universal',
      category: 'SSR',
      description: 'Solution officielle pour le Server-Side Rendering (SSR) et pré-rendering',
      official: true,
      url: 'https://angular.dev/guide/ssr'
    },
    {
      name: 'Angular DevTools',
      category: 'Debugging',
      description: 'Extension Chrome/Firefox pour debugger et profiler les applications Angular',
      official: true,
      url: 'https://angular.dev/tools/devtools'
    },
    {
      name: 'RxJS',
      category: 'Reactive Programming',
      description: 'Bibliothèque de programmation réactive utilisée par Angular pour la gestion asynchrone',
      official: false,
      url: 'https://rxjs.dev'
    },
    {
      name: 'NgRx',
      category: 'State Management',
      description: 'Solution de gestion d\'état inspirée de Redux pour les grandes applications',
      official: false,
      url: 'https://ngrx.io'
    },
    {
      name: 'Nx',
      category: 'Monorepo',
      description: 'Outil pour gérer des monorepos Angular avec build system optimisé',
      official: false,
      url: 'https://nx.dev'
    },
    {
      name: 'Karma & Jasmine',
      category: 'Testing',
      description: 'Framework de test unitaire par défaut dans Angular',
      official: false,
      url: 'https://jasmine.github.io'
    },
    {
      name: 'Protractor → Cypress',
      category: 'E2E Testing',
      description: 'Tests end-to-end (Protractor deprecated, Cypress recommandé)',
      official: false,
      url: 'https://www.cypress.io'
    },
    {
      name: 'PrimeNG',
      category: 'UI Components',
      description: 'Riche collection de composants UI pour Angular',
      official: false,
      url: 'https://primeng.org'
    },
    {
      name: 'NG-ZORRO',
      category: 'UI Components',
      description: 'Composants UI basés sur Ant Design',
      official: false,
      url: 'https://ng.ant.design'
    },
    {
      name: 'Transloco',
      category: 'i18n',
      description: 'Bibliothèque moderne pour l\'internationalisation',
      official: false,
      url: 'https://ngneat.github.io/transloco'
    }
  ];

  getToolsByCategory(category: string): Tool[] {
    return this.tools.filter(tool => tool.category === category);
  }

  get officialTools(): Tool[] {
    return this.tools.filter(tool => tool.official);
  }

  get communityTools(): Tool[] {
    return this.tools.filter(tool => !tool.official);
  }
}
