import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ComponentFeature {
  title: string;
  description: string;
  code: string;
}

interface LifecycleHook {
  name: string;
  timing: string;
  useCase: string;
}

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {
  // Example properties for template
  userName: string = 'John Doe';
  age: number = 30;
  secondsElapsed: number = 0;

  features: ComponentFeature[] = [
    {
      title: 'Selector',
      description: 'Définit comment le composant sera utilisé dans les templates',
      code: 'selector: \'app-user-profile\'\n// Usage: <app-user-profile></app-user-profile>'
    },
    {
      title: 'Template / TemplateUrl',
      description: 'Définit le HTML du composant (inline ou fichier externe)',
      code: 'template: \'<h1>Hello</h1>\'\n// ou\ntemplateUrl: \'./component.html\''
    },
    {
      title: 'Styles / StyleUrls',
      description: 'Définit les styles CSS du composant (encapsulés par défaut)',
      code: 'styles: [\'h1 { color: blue; }\']\n// ou\nstyleUrls: [\'./component.css\']'
    },
    {
      title: 'Standalone',
      description: 'Indique que le composant n\'a pas besoin de NgModule',
      code: 'standalone: true,\nimports: [CommonModule, FormsModule]'
    },
    {
      title: 'Providers',
      description: 'Services disponibles uniquement pour ce composant et ses enfants',
      code: 'providers: [UserService]'
    }
  ];

  lifecycleHooks: LifecycleHook[] = [
    {
      name: 'ngOnChanges',
      timing: 'Avant ngOnInit et à chaque changement d\'@Input',
      useCase: 'Réagir aux changements de propriétés @Input'
    },
    {
      name: 'ngOnInit',
      timing: 'Une fois après le premier ngOnChanges',
      useCase: 'Initialisation du composant (appels API, etc.)'
    },
    {
      name: 'ngDoCheck',
      timing: 'À chaque cycle de détection de changements',
      useCase: 'Détecter des changements qu\'Angular ne détecte pas'
    },
    {
      name: 'ngAfterContentInit',
      timing: 'Une fois après projection du contenu',
      useCase: 'Agir après projection de ng-content'
    },
    {
      name: 'ngAfterContentChecked',
      timing: 'Après chaque vérification du contenu projeté',
      useCase: 'Réagir aux changements du contenu projeté'
    },
    {
      name: 'ngAfterViewInit',
      timing: 'Une fois après initialisation de la vue',
      useCase: 'Accéder aux éléments DOM via @ViewChild'
    },
    {
      name: 'ngAfterViewChecked',
      timing: 'Après chaque vérification de la vue',
      useCase: 'Réagir aux changements de la vue'
    },
    {
      name: 'ngOnDestroy',
      timing: 'Juste avant la destruction du composant',
      useCase: 'Nettoyage (unsubscribe, timers, etc.)'
    }
  ];
}
