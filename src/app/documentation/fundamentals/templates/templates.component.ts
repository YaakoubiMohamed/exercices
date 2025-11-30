import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TemplateSyntax {
  name: string;
  syntax: string;
  description: string;
  example: string;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {
  // Example properties for template
  title: string = 'My Angular App';
  count: number = 5;
  userName: string = 'Alice';

  getFullName(): string {
    return 'Alice Johnson';
  }

  syntaxElements: TemplateSyntax[] = [
    {
      name: 'Interpolation',
      syntax: '{{ expression }}',
      description: 'Affiche une valeur dans le template',
      example: '<h1>Bonjour {{ userName }}</h1>'
    },
    {
      name: 'Property Binding',
      syntax: '[property]="value"',
      description: 'Lie une propriété du DOM à une valeur TypeScript',
      example: '<img [src]="imageUrl" [alt]="imageDescription">'
    },
    {
      name: 'Event Binding',
      syntax: '(event)="handler()"',
      description: 'Écoute un événement du DOM',
      example: '<button (click)="save()">Enregistrer</button>'
    },
    {
      name: 'Two-way Binding',
      syntax: '[(ngModel)]="property"',
      description: 'Synchronisation bidirectionnelle',
      example: '<input [(ngModel)]="userName">'
    },
    {
      name: 'Template Reference',
      syntax: '#variable',
      description: 'Référence à un élément du DOM',
      example: '<input #nameInput> <button (click)="log(nameInput.value)">Log</button>'
    },
    {
      name: 'Attribute Binding',
      syntax: '[attr.name]="value"',
      description: 'Lie un attribut HTML',
      example: '<button [attr.aria-label]="helpText">Aide</button>'
    }
  ];

  // Demo properties
  demoText = 'Angular';
  demoCount = 0;
  demoVisible = true;
}
