import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface UseCase {
  title: string;
  icon: string;
  description: string;
  reasons: string[];
  examples: string[];
}

@Component({
  selector: 'app-when-to-use',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './when-to-use.component.html',
  styleUrl: './when-to-use.component.css'
})
export class WhenToUseComponent {
  goodUseCases: UseCase[] = [
    {
      title: 'Applications Enterprise',
      icon: '🏢',
      description: 'Grandes applications complexes avec besoins métier avancés',
      reasons: [
        'Architecture structurée et maintenable',
        'TypeScript obligatoire pour typage fort',
        'Support long terme garanti (LTS)',
        'Équipes multiples nécessitant uniformité'
      ],
      examples: [
        'ERP et CRM',
        'Plateformes bancaires',
        'Systèmes de gestion internes',
        'Applications de trading'
      ]
    },
    {
      title: 'Single Page Applications (SPA)',
      icon: '📱',
      description: 'Applications web complexes avec navigation fluide',
      reasons: [
        'Routing sophistiqué intégré',
        'State management robuste',
        'Lazy loading natif',
        'Performance optimisée'
      ],
      examples: [
        'Dashboards analytiques',
        'Portails clients',
        'Applications SaaS',
        'Outils de collaboration'
      ]
    },
    {
      title: 'Progressive Web Apps (PWA)',
      icon: '🚀',
      description: 'Applications installables fonctionnant offline',
      reasons: [
        'Support PWA natif dans Angular CLI',
        'Service Workers intégrés',
        'Stratégies de cache avancées',
        'Expérience native mobile'
      ],
      examples: [
        'Applications de productivité',
        'Outils terrain sans connexion',
        'Applications de vente mobile',
        'Lecteurs de contenu offline'
      ]
    },
    {
      title: 'Applications Critiques',
      icon: '🛡️',
      description: 'Systèmes nécessitant fiabilité et stabilité maximales',
      reasons: [
        'TypeScript élimine erreurs runtime',
        'Tests unitaires et E2E intégrés',
        'Support Google et communauté',
        'Mises à jour prévisibles (6 mois)'
      ],
      examples: [
        'Systèmes médicaux',
        'Applications financières',
        'Plateformes gouvernementales',
        'Infrastructures critiques'
      ]
    }
  ];

  badUseCases: UseCase[] = [
    {
      title: 'Sites Vitrines Simples',
      icon: '🌐',
      description: 'Sites majoritairement statiques avec peu d\'interactivité',
      reasons: [
        'Overhead inutile pour contenu statique',
        'SEO plus complexe (nécessite SSR)',
        'Bundle size trop important',
        'Temps de chargement initial élevé'
      ],
      examples: [
        'Sites de présentation',
        'Blogs personnels',
        'Landing pages marketing',
        'Portfolios simples'
      ]
    },
    {
      title: 'Prototypes Rapides',
      icon: '⚡',
      description: 'MVPs nécessitant un time-to-market minimal',
      reasons: [
        'Setup initial plus long',
        'Courbe d\'apprentissage élevée',
        'Configuration complexe',
        'Overhead pour petits projets'
      ],
      examples: [
        'POCs marketing',
        'Démos commerciales',
        'Tests A/B rapides',
        'Prototypes jetables'
      ]
    },
    {
      title: 'Projets avec Contraintes de Performance',
      icon: '📦',
      description: 'Applications nécessitant bundle size minimal absolu',
      reasons: [
        'Bundle initial ~150-300KB (vs React ~40KB)',
        'First Load plus lent',
        'Pas optimal pour 2G/3G',
        'Alternatives plus légères disponibles'
      ],
      examples: [
        'Applications mobiles bas débit',
        'Marchés émergents',
        'Widgets embarqués tiers',
        'Extensions navigateur'
      ]
    },
    {
      title: 'Équipes Sans Expérience TypeScript',
      icon: '👥',
      description: 'Équipes débutantes nécessitant démarrage rapide',
      reasons: [
        'Courbe d\'apprentissage TypeScript',
        'Concepts avancés (RxJS, DI)',
        'Formation nécessaire',
        'Productivité initiale faible'
      ],
      examples: [
        'Freelances débutants',
        'Agences web généralistes',
        'Équipes full-stack junior',
        'Projets avec budget formation limité'
      ]
    }
  ];
}
