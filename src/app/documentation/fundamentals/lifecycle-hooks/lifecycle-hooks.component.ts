import { Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface LifecycleHook {
  name: string;
  timing: string;
  phase: string;
  description: string;
  useCase: string;
  calledOnce: boolean;
  order: number;
}

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lifecycle-hooks.component.html',
  styleUrl: './lifecycle-hooks.component.css'
})
export class LifecycleHooksComponent implements OnInit, OnDestroy {
  logs: string[] = [];
  counter = 0;

  hooks: LifecycleHook[] = [
    {
      name: 'ngOnChanges',
      timing: 'Avant ngOnInit et à chaque changement d\'@Input',
      phase: 'Initialization',
      description: 'Appelé quand une propriété liée (@Input) change',
      useCase: 'Réagir aux changements de propriétés @Input',
      calledOnce: false,
      order: 1
    },
    {
      name: 'ngOnInit',
      timing: 'Une fois après le premier ngOnChanges',
      phase: 'Initialization',
      description: 'Initialise le composant après la première affichage des propriétés',
      useCase: 'Initialisation, appels API, souscriptions',
      calledOnce: true,
      order: 2
    },
    {
      name: 'ngDoCheck',
      timing: 'À chaque cycle de détection de changements',
      phase: 'Change Detection',
      description: 'Détecte et agit sur les changements qu\'Angular ne peut pas détecter',
      useCase: 'Détection personnalisée (attention aux performances)',
      calledOnce: false,
      order: 3
    },
    {
      name: 'ngAfterContentInit',
      timing: 'Une fois après le premier ngDoCheck',
      phase: 'Content Projection',
      description: 'Appelé après la projection du contenu dans le composant',
      useCase: 'Accéder au contenu projeté via @ContentChild',
      calledOnce: true,
      order: 4
    },
    {
      name: 'ngAfterContentChecked',
      timing: 'Après ngAfterContentInit et chaque ngDoCheck',
      phase: 'Content Projection',
      description: 'Appelé après vérification du contenu projeté',
      useCase: 'Réagir aux changements du contenu projeté',
      calledOnce: false,
      order: 5
    },
    {
      name: 'ngAfterViewInit',
      timing: 'Une fois après le premier ngAfterContentChecked',
      phase: 'View Rendering',
      description: 'Appelé après l\'initialisation des vues du composant',
      useCase: 'Accéder aux éléments via @ViewChild, manipulation DOM',
      calledOnce: true,
      order: 6
    },
    {
      name: 'ngAfterViewChecked',
      timing: 'Après ngAfterViewInit et chaque ngAfterContentChecked',
      phase: 'View Rendering',
      description: 'Appelé après vérification des vues du composant',
      useCase: 'Réagir aux changements de la vue',
      calledOnce: false,
      order: 7
    },
    {
      name: 'ngOnDestroy',
      timing: 'Juste avant la destruction du composant',
      phase: 'Cleanup',
      description: 'Nettoyage avant la destruction du composant',
      useCase: 'Unsubscribe, détacher listeners, cleanup',
      calledOnce: true,
      order: 8
    }
  ];

  ngOnInit() {
    this.addLog('ngOnInit appelé');
  }

  ngOnDestroy() {
    this.addLog('ngOnDestroy appelé');
  }

  addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.unshift(`[${timestamp}] ${message}`);
    if (this.logs.length > 10) {
      this.logs.pop();
    }
  }

  simulateChange() {
    this.counter++;
    this.addLog(`Changement simulé - Counter: ${this.counter}`);
  }

  clearLogs() {
    this.logs = [];
  }
}
