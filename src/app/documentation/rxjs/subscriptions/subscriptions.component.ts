import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  unsubscribePatterns = [
    {
      name: 'Manual Unsubscribe',
      description: 'Stocker et désouscrire manuellement',
      pros: 'Contrôle total',
      cons: 'Verbeux, risque d\'oubli'
    },
    {
      name: 'takeUntil Pattern',
      description: 'Utiliser un Subject destroy$',
      pros: 'Centralisé, élégant',
      cons: 'Nécessite Subject'
    },
    {
      name: 'AsyncPipe',
      description: 'Laisser Angular gérer',
      pros: 'Automatique, sûr',
      cons: 'Limité au template'
    },
    {
      name: 'take(1)',
      description: 'Pour observables à valeur unique',
      pros: 'Simple, pas de gestion',
      cons: 'Une seule valeur'
    }
  ];

  memoryLeakSigns = [
    'Composants non détruits en mémoire',
    'Augmentation progressive de la RAM',
    'Ralentissement de l\'application',
    'Événements qui se déclenchent plusieurs fois',
    'Erreurs "Cannot read property of undefined"'
  ];

  bestPractices = [
    'Toujours désouscrire dans ngOnDestroy',
    'Utiliser async pipe dans les templates',
    'Centraliser avec takeUntil pattern',
    'Éviter les subscribe dans subscribe',
    'Préférer les opérateurs aux subscriptions manuelles'
  ];

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
