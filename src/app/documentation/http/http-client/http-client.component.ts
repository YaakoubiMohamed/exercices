import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-http-client',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css'
})
export class HttpClientComponent {
  httpMethods = [
    { method: 'GET', description: 'Récupérer des données', example: 'http.get<User[]>(url)' },
    { method: 'POST', description: 'Créer une ressource', example: 'http.post<User>(url, data)' },
    { method: 'PUT', description: 'Mettre à jour (complet)', example: 'http.put<User>(url, data)' },
    { method: 'PATCH', description: 'Mettre à jour (partiel)', example: 'http.patch<User>(url, data)' },
    { method: 'DELETE', description: 'Supprimer une ressource', example: 'http.delete(url)' }
  ];

  requestOptions = [
    { option: 'headers', description: 'En-têtes HTTP personnalisés', example: '{ headers: new HttpHeaders({ \'Auth\': token }) }' },
    { option: 'params', description: 'Paramètres de requête (query string)', example: '{ params: new HttpParams().set(\'page\', \'1\') }' },
    { option: 'observe', description: 'Type de réponse (body/response/events)', example: '{ observe: \'response\' }' },
    { option: 'responseType', description: 'Format de réponse (json/text/blob)', example: '{ responseType: \'text\' }' }
  ];

  errorHandling = [
    'Utiliser catchError pour gérer les erreurs',
    'Différencier erreurs client (4xx) et serveur (5xx)',
    'Fournir des messages d\'erreur utilisateurs',
    'Logger les erreurs pour le debugging',
    'Implémenter retry logic si nécessaire'
  ];
}
