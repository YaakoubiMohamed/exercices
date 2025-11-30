import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { of, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css'
})
export class ObservablesComponent {
  characteristics = [
    { name: 'Lazy', description: 'Ne s\'exécute pas avant souscription' },
    { name: 'Push-based', description: 'Pousse les valeurs aux observers' },
    { name: 'Asynchrone', description: 'Gère les opérations asynchrones' },
    { name: 'Composable', description: 'Combinaison via opérateurs' },
    { name: 'Cancellable', description: 'Peut être annulé via unsubscribe' }
  ];

  creationMethods = [
    { method: 'of()', example: 'of(1, 2, 3)', description: 'Crée à partir de valeurs' },
    { method: 'from()', example: 'from([1, 2, 3])', description: 'Convertit array/promise' },
    { method: 'interval()', example: 'interval(1000)', description: 'Émet à intervalle régulier' },
    { method: 'fromEvent()', example: 'fromEvent(button, \'click\')', description: 'Depuis événements DOM' },
    { method: 'ajax()', example: 'ajax.getJSON(url)', description: 'Requêtes HTTP' }
  ];

  vsPromises = [
    { aspect: 'Valeurs', observable: 'Multiples valeurs', promise: 'Une seule valeur' },
    { aspect: 'Lazy', observable: 'Oui', promise: 'Non (eager)' },
    { aspect: 'Cancellable', observable: 'Oui', promise: 'Non' },
    { aspect: 'Opérateurs', observable: 'map, filter, etc.', promise: 'then, catch' }
  ];

  // Demo observable
  demoObservable$ = interval(1000).pipe(
    take(5),
    map(i => `Valeur ${i + 1}`)
  );
}
