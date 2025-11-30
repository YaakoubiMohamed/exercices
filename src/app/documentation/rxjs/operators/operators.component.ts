import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent {
  operatorCategories = [
    {
      name: 'Transformation',
      operators: [
        { name: 'map', description: 'Transforme chaque valeur', example: 'map(x => x * 2)' },
        { name: 'pluck', description: 'Extrait une propriété', example: 'pluck(\'name\')' },
        { name: 'scan', description: 'Accumulation (comme reduce)', example: 'scan((acc, val) => acc + val)' }
      ]
    },
    {
      name: 'Filtrage',
      operators: [
        { name: 'filter', description: 'Filtre les valeurs', example: 'filter(x => x > 10)' },
        { name: 'take', description: 'Prend N premières valeurs', example: 'take(5)' },
        { name: 'skip', description: 'Ignore N premières valeurs', example: 'skip(2)' },
        { name: 'distinct', description: 'Valeurs uniques', example: 'distinct()' }
      ]
    },
    {
      name: 'Combinaison',
      operators: [
        { name: 'merge', description: 'Fusionne plusieurs observables', example: 'merge(obs1, obs2)' },
        { name: 'concat', description: 'Concatène séquentiellement', example: 'concat(obs1, obs2)' },
        { name: 'combineLatest', description: 'Dernières valeurs de chaque', example: 'combineLatest([obs1, obs2])' },
        { name: 'zip', description: 'Paires de valeurs', example: 'zip(obs1, obs2)' }
      ]
    },
    {
      name: 'Gestion d\'erreurs',
      operators: [
        { name: 'catchError', description: 'Attrape et gère les erreurs', example: 'catchError(err => of(default))' },
        { name: 'retry', description: 'Réessaye N fois', example: 'retry(3)' },
        { name: 'retryWhen', description: 'Réessaye avec stratégie', example: 'retryWhen(errors => ...)' }
      ]
    },
    {
      name: 'Utilitaires',
      operators: [
        { name: 'tap', description: 'Effet de bord (debug)', example: 'tap(x => console.log(x))' },
        { name: 'delay', description: 'Retarde l\'émission', example: 'delay(1000)' },
        { name: 'debounceTime', description: 'Débounce temporel', example: 'debounceTime(300)' },
        { name: 'throttleTime', description: 'Throttle temporel', example: 'throttleTime(1000)' }
      ]
    }
  ];
}
