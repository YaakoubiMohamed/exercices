import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generics.component.html',
  styleUrl: './generics.component.css'
})
export class GenericsComponent {
  benefits = [
    { title: 'Type Safety', description: 'Code réutilisable et type-safe' },
    { title: 'DRY', description: 'Évite la duplication de code' },
    { title: 'Inférence', description: 'Inférence de type automatique' },
    { title: 'IDE', description: 'Meilleure autocomplétion IDE' },
    { title: 'Erreurs', description: 'Détection d\'erreurs à la compilation' }
  ];

  useCases = [
    'Services génériques (CRUD)',
    'Fonctions utilitaires',
    'Collections typées',
    'Composants réutilisables',
    'Wrappers de données (Response<T>)'
  ];

  constraints = [
    { type: 'Class Extension', syntax: 'T extends BaseClass', description: 'T doit étendre BaseClass', example: 'class Box<T extends Animal>' },
    { type: 'Keyof', syntax: 'T extends keyof Interface', description: 'T est une clé d\'Interface', example: 'function get<T, K extends keyof T>(obj: T, key: K)' },
    { type: 'Union', syntax: 'T extends string | number', description: 'T est string ou number', example: 'function format<T extends string | number>(value: T)' },
    { type: 'Shape', syntax: 'T extends { id: number }', description: 'T a une propriété id', example: 'function save<T extends { id: number }>(entity: T)' }
  ];

  examples = [
    'HttpClient.get<T>(url): Observable<T>',
    'Array<T>',
    'Promise<T>',
    'Observable<T>',
    'FormControl<T>'
  ];
}
