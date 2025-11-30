import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interceptors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './interceptors.component.html',
  styleUrl: './interceptors.component.css'
})
export class InterceptorsComponent {
  useCases = [
    'Ajouter automatiquement des tokens d\'authentification',
    'Logger toutes les requêtes HTTP',
    'Gérer centralement les erreurs',
    'Modifier les headers de toutes les requêtes',
    'Ajouter un loading indicator',
    'Transformer les réponses',
    'Gérer les refresh tokens',
    'Ajouter un cache'
  ];

  interceptorFlow = [
    { step: '1', description: 'La requête est créée par HttpClient' },
    { step: '2', description: 'L\'intercepteur intercepte la requête' },
    { step: '3', description: 'Modification de la requête (headers, params, etc.)' },
    { step: '4', description: 'La requête modifiée est envoyée au serveur' },
    { step: '5', description: 'La réponse revient du serveur' },
    { step: '6', description: 'L\'intercepteur intercepte la réponse' },
    { step: '7', description: 'Modification/traitement de la réponse' },
    { step: '8', description: 'La réponse modifiée est retournée' }
  ];

  bestPractices = [
    'Garder les intercepteurs simples et focalisés',
    'Utiliser plusieurs intercepteurs plutôt qu\'un seul complexe',
    'L\'ordre d\'enregistrement définit l\'ordre d\'exécution',
    'Toujours retourner next.handle() pour continuer la chaîne',
    'Gérer les erreurs avec catchError'
  ];
}
