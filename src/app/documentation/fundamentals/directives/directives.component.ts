import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BuiltInDirective {
  name: string;
  type: string;
  description: string;
  syntax: string;
  example: string;
}

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.css'
})
export class DirectivesComponent {
  // Demo properties
  isVisible = true;
  items = ['Angular', 'React', 'Vue'];
  selectedColor = 'blue';
  
  structuralDirectives: BuiltInDirective[] = [
    {
      name: '@if',
      type: 'Structural',
      description: 'Affiche conditionnellement du contenu',
      syntax: '@if (condition) { ... } @else { ... }',
      example: '@if (isLoggedIn) { <p>Welcome!</p> } @else { <p>Please login</p> }'
    },
    {
      name: '@for',
      type: 'Structural',
      description: 'Itère sur une collection',
      syntax: '@for (item of items; track item.id) { ... }',
      example: '@for (user of users; track user.id) { <div>{{ user.name }}</div> }'
    },
    {
      name: '@switch',
      type: 'Structural',
      description: 'Affiche du contenu selon plusieurs cas',
      syntax: '@switch (value) { @case (x) { ... } @default { ... } }',
      example: '@switch (status) { @case ("active") { <span>✓</span> } @default { <span>-</span> } }'
    }
  ];

  attributeDirectives: BuiltInDirective[] = [
    {
      name: 'ngClass',
      type: 'Attribute',
      description: 'Ajoute/supprime des classes CSS dynamiquement',
      syntax: '[ngClass]="{ \'class\': condition }"',
      example: '<div [ngClass]="{ \'active\': isActive, \'disabled\': !isEnabled }"></div>'
    },
    {
      name: 'ngStyle',
      type: 'Attribute',
      description: 'Applique des styles CSS dynamiquement',
      syntax: '[ngStyle]="{ \'property\': value }"',
      example: '<div [ngStyle]="{ \'color\': textColor, \'font-size\': fontSize + \'px\' }"></div>'
    },
    {
      name: 'ngModel',
      type: 'Attribute',
      description: 'Crée un binding bidirectionnel avec un champ de formulaire',
      syntax: '[(ngModel)]="property"',
      example: '<input [(ngModel)]="username">'
    }
  ];
}
