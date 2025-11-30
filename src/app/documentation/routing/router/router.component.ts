import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-router',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './router.component.html',
  styleUrl: './router.component.css'
})
export class RouterComponent {
  routeConfig = [
    { property: 'path', description: 'Chemin de la route', example: '\'users\' ou \'users/:id\'' },
    { property: 'component', description: 'Composant à afficher', example: 'UserComponent' },
    { property: 'loadComponent', description: 'Lazy loading du composant', example: '() => import(...)' },
    { property: 'children', description: 'Routes enfants', example: '[{ path: \'profile\', ... }]' },
    { property: 'redirectTo', description: 'Redirection', example: '\'/home\'' },
    { property: 'pathMatch', description: 'Stratégie de matching', example: '\'full\' ou \'prefix\'' }
  ];

  navigationMethods = [
    { method: 'routerLink', description: 'Directive dans template', example: '<a routerLink="/users">Users</a>' },
    { method: 'router.navigate()', description: 'Navigation programmatique', example: 'this.router.navigate([\'/users\', userId])' },
    { method: 'router.navigateByUrl()', description: 'Navigation avec URL absolue', example: 'this.router.navigateByUrl(\'/users/123\')' }
  ];

  routeParams = [
    { type: 'Route Parameters', syntax: '/users/:id', access: 'route.params or route.snapshot.params' },
    { type: 'Query Parameters', syntax: '/users?page=1&sort=name', access: 'route.queryParams' },
    { type: 'Fragment', syntax: '/users#section', access: 'route.fragment' }
  ];
}
