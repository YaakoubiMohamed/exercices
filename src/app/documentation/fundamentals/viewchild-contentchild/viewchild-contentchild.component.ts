import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface QueryDecorator {
  name: string;
  scope: string;
  timing: string;
  description: string;
  useCase: string;
}

@Component({
  selector: 'app-viewchild-contentchild',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './viewchild-contentchild.component.html',
  styleUrl: './viewchild-contentchild.component.css'
})
export class ViewChildContentChildComponent {
  decorators: QueryDecorator[] = [
    {
      name: '@ViewChild',
      scope: 'Template du composant',
      timing: 'ngAfterViewInit',
      description: 'Accède au premier élément dans le template',
      useCase: 'Manipulation DOM, accès composants enfants'
    },
    {
      name: '@ViewChildren',
      scope: 'Template du composant',
      timing: 'ngAfterViewInit',
      description: 'Accède à plusieurs éléments via QueryList',
      useCase: 'Itérer sur plusieurs composants/éléments'
    },
    {
      name: '@ContentChild',
      scope: 'Contenu projeté',
      timing: 'ngAfterContentInit',
      description: 'Accède au premier élément projeté',
      useCase: 'Accès au contenu ng-content'
    },
    {
      name: '@ContentChildren',
      scope: 'Contenu projeté',
      timing: 'ngAfterContentInit',
      description: 'Accède à plusieurs éléments projetés',
      useCase: 'Liste d\'éléments projetés'
    }
  ];
}
