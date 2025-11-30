import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjectTypes = [
    {
      name: 'Subject',
      description: 'Subject de base, pas de valeur initiale',
      behavior: 'Émet uniquement aux futurs souscripteurs',
      useCase: 'Event bus, multicasting simple'
    },
    {
      name: 'BehaviorSubject',
      description: 'Requiert une valeur initiale',
      behavior: 'Émet la dernière valeur immédiatement',
      useCase: 'État de l\'application, valeurs courantes'
    },
    {
      name: 'ReplaySubject',
      description: 'Rejoue N dernières valeurs',
      behavior: 'Buffer des N dernières émissions',
      useCase: 'Historique des événements'
    },
    {
      name: 'AsyncSubject',
      description: 'Émet uniquement la dernière valeur à complete',
      behavior: 'Une seule émission finale',
      useCase: 'Résultats de calculs asynchrones'
    }
  ];

  comparison = [
    { feature: 'Valeur initiale', subject: 'Non', behavior: 'Oui (requis)', replay: 'Non' },
    { feature: 'Émission au subscribe', subject: 'Non', behavior: 'Dernière valeur', replay: 'N dernières' },
    { feature: 'Buffer', subject: 'Non', behavior: '1 valeur', replay: 'N valeurs' },
    { feature: 'getValue()', subject: 'Non', behavior: 'Oui', replay: 'Non' }
  ];

  // Demo subjects
  behaviorDemo = new BehaviorSubject<number>(0);
  replayDemo = new ReplaySubject<string>(3);

  useCases = [
    'State management avec BehaviorSubject',
    'Communication entre composants',
    'Caching de données avec ReplaySubject',
    'Event bus avec Subject',
    'Partage de données en temps réel'
  ];
}
