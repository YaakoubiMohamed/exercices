import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProjectionPattern {
  name: string;
  type: string;
  description: string;
  useCase: string;
}

@Component({
  selector: 'app-content-projection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './content-projection.component.html',
  styleUrl: './content-projection.component.css'
})
export class ContentProjectionComponent {
  patterns: ProjectionPattern[] = [
    {
      name: 'Single-slot',
      type: 'Simple',
      description: 'Projection unique avec <ng-content>',
      useCase: 'Contenu simple, cards, modals basiques'
    },
    {
      name: 'Multi-slot',
      type: 'Avancé',
      description: 'Plusieurs zones de projection avec select',
      useCase: 'Layouts complexes, headers/body/footer'
    },
    {
      name: 'Conditional',
      type: 'Dynamique',
      description: 'Projection conditionnelle avec @if',
      useCase: 'Affichage optionnel, templates alternatifs'
    }
  ];
}
