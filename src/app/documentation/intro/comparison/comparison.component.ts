import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Framework {
  name: string;
  type: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent {
  frameworks: Framework[] = [
    {
      name: 'Angular',
      type: 'Framework complet',
      pros: [
        'Tout inclus (routing, forms, HTTP, testing)',
        'TypeScript natif avec typage fort',
        'Architecture enterprise éprouvée',
        'Support officiel Google et LTS',
        'Documentation exhaustive',
        'CLI puissant pour génération de code'
      ],
      cons: [
        'Courbe d\'apprentissage plus élevée',
        'Bundle size plus important au départ',
        'Opinionated (moins de flexibilité)',
        'Overhead pour petits projets'
      ],
      bestFor: [
        'Applications enterprise complexes',
        'Grandes équipes avec besoins d\'uniformité',
        'Projets long terme nécessitant stabilité',
        'Applications critiques nécessitant TypeScript'
      ]
    },
    {
      name: 'React',
      type: 'Library UI',
      pros: [
        'Courbe d\'apprentissage douce',
        'Bundle size minimal',
        'Flexibilité maximale',
        'Écosystème riche et innovant',
        'JSX intuitif',
        'Large communauté'
      ],
      cons: [
        'Nécessite nombreuses dépendances externes',
        'Pas de conventions établies',
        'Architecture variable entre projets',
        'JavaScript par défaut (TypeScript optionnel)'
      ],
      bestFor: [
        'Startups et projets agiles',
        'Petites équipes expérimentées',
        'Applications nécessitant flexibilité',
        'Projets avec besoins spécifiques'
      ]
    },
    {
      name: 'Vue',
      type: 'Framework progressif',
      pros: [
        'Courbe d\'apprentissage la plus douce',
        'Syntaxe template proche du HTML',
        'Flexibilité (progressif)',
        'Bundle size très optimisé',
        'Documentation excellente',
        'Composition API moderne'
      ],
      cons: [
        'Écosystème moins mature qu\'Angular/React',
        'Moins adapté aux très grandes applications',
        'Support entreprise limité',
        'Communauté plus petite'
      ],
      bestFor: [
        'Projets petits à moyens',
        'Développeurs débutants',
        'Applications nécessitant rapidité',
        'Prototypes et MVPs'
      ]
    }
  ];
}
