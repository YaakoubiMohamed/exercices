import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './decorators.component.html',
  styleUrl: './decorators.component.css'
})
export class DecoratorsComponent {
  decoratorTypes = [
    {
      type: 'Class Decorators',
      description: 'Appliqués aux classes',
      example: '@Component, @Injectable',
      examples: ['@Component', '@Injectable', '@Directive', '@Pipe', '@NgModule']
    },
    {
      type: 'Property Decorators',
      description: 'Appliqués aux propriétés',
      example: '@Input, @Output',
      examples: ['@Input', '@Output', '@ViewChild', '@ContentChild', '@HostBinding']
    },
    {
      type: 'Method Decorators',
      description: 'Appliqués aux méthodes',
      example: '@HostListener',
      examples: ['@HostListener', '@Debounce (custom)']
    },
    {
      type: 'Parameter Decorators',
      description: 'Appliqués aux paramètres',
      example: '@Inject, @Optional',
      examples: ['@Inject', '@Optional', '@Self', '@SkipSelf', '@Host']
    }
  ];

  angularDecorators = [
    { name: '@Input()', decorator: '@Input()', purpose: 'Entrée de données parent → enfant', description: 'Entrée de données parent → enfant', example: '@Input() title: string;' },
    { name: '@Output()', decorator: '@Output()', purpose: 'Sortie d\'événements enfant → parent', description: 'Sortie d\'événements enfant → parent', example: '@Output() change = new EventEmitter();' },
    { name: '@ViewChild()', decorator: '@ViewChild()', purpose: 'Référence à un élément/composant', description: 'Référence à un élément/composant', example: '@ViewChild(\'myDiv\') div!: ElementRef;' },
    { name: '@ContentChild()', decorator: '@ContentChild()', purpose: 'Référence au contenu projeté', description: 'Référence au contenu projeté', example: '@ContentChild(CardHeader) header!: CardHeader;' },
    { name: '@HostListener()', decorator: '@HostListener()', purpose: 'Écoute événements sur l\'hôte', description: 'Écoute événements sur l\'hôte', example: '@HostListener(\'click\') onClick() {}' },
    { name: '@HostBinding()', decorator: '@HostBinding()', purpose: 'Lie propriété à l\'hôte', description: 'Lie propriété à l\'hôte', example: '@HostBinding(\'class.active\') isActive = true;' }
  ];

  customDecorator = {
    name: 'Créer un decorator personnalisé',
    purpose: 'Ajouter des fonctionnalités réutilisables',
    examples: ['@Log (logging)', '@Debounce (anti-rebond)', '@Memoize (cache)']
  };
}
