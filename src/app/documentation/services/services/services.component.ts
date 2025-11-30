import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceExample {
  name: string;
  description: string;
  code: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  serviceTypes = [
    { name: 'Singleton', description: 'Instance unique partagée dans toute l\'application', providedIn: 'root' },
    { name: 'Module-scoped', description: 'Instance unique par module', providedIn: 'Module' },
    { name: 'Component-scoped', description: 'Instance unique par composant', providedIn: 'Component' }
  ];

  useCases = [
    'Appels API et communication HTTP',
    'Gestion de l\'état de l\'application',
    'Logique métier réutilisable',
    'Accès aux données et cache',
    'Communication entre composants',
    'Utilitaires et helpers'
  ];

  advantages = [
    'Séparation des préoccupations',
    'Réutilisabilité du code',
    'Testabilité améliorée',
    'Injection de dépendances',
    'Maintenance facilitée'
  ];
}
