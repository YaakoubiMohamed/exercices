import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CourseModule {
  id: string;
  title: string;
  icon: string;
  description: string;
  topics: CourseTopic[];
}

interface CourseTopic {
  id: string;
  name: string;
  route: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
}

@Component({
  selector: 'app-course-plan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-plan.component.html',
  styleUrl: './course-plan.component.css'
})
export class CoursePlanComponent {
  courseModules: CourseModule[] = [
    {
      id: 'intro',
      title: 'Introduction à Angular',
      icon: '🌟',
      description: 'Découvrez Angular, son histoire, son évolution et ses avantages',
      topics: [
        { id: 'what-is-angular', name: 'Qu\'est-ce qu\'Angular ?', route: '/documentation/intro/what-is-angular', difficulty: 'Débutant' },
        { id: 'angular-history', name: 'Histoire et Évolution (AngularJS → Angular 20)', route: '/documentation/intro/history', difficulty: 'Débutant' },
        { id: 'angular-architecture', name: 'Architecture et Philosophie', route: '/documentation/intro/architecture', difficulty: 'Débutant' },
        { id: 'angular-vs-competitors', name: 'Angular vs React vs Vue', route: '/documentation/intro/comparison', difficulty: 'Intermédiaire' },
        { id: 'angular-ecosystem', name: 'Écosystème Angular (CLI, Material, etc.)', route: '/documentation/intro/ecosystem', difficulty: 'Débutant' },
        { id: 'when-to-use-angular', name: 'Quand utiliser Angular ?', route: '/documentation/intro/when-to-use', difficulty: 'Intermédiaire' }
      ]
    },
    {
      id: 'angular-basics',
      title: 'Angular Fundamentals',
      icon: '🎯',
      description: 'Concepts de base d\'Angular 20',
      topics: [
        { id: 'components', name: 'Components & Standalone', route: '/documentation/fundamentals/components', difficulty: 'Débutant' },
        { id: 'templates', name: 'Templates & Data Binding', route: '/documentation/fundamentals/templates', difficulty: 'Débutant' },
        { id: 'data-binding', name: 'Data Binding', route: '/documentation/fundamentals/data-binding', difficulty: 'Débutant' },
        { id: 'directives', name: 'Directives & Control Flow', route: '/documentation/fundamentals/directives', difficulty: 'Débutant' },
        { id: 'pipes', name: 'Pipes', route: '/documentation/fundamentals/pipes', difficulty: 'Débutant' },
        { id: 'lifecycle-hooks', name: 'Lifecycle Hooks', route: '/documentation/fundamentals/lifecycle-hooks', difficulty: 'Intermédiaire' },
        { id: 'input-output', name: '@Input & @Output', route: '/documentation/fundamentals/input-output', difficulty: 'Intermédiaire' },
        { id: 'content-projection', name: 'Content Projection', route: '/documentation/fundamentals/content-projection', difficulty: 'Intermédiaire' },
        { id: 'viewchild-contentchild', name: '@ViewChild & @ContentChild', route: '/documentation/fundamentals/viewchild-contentchild', difficulty: 'Avancé' }
      ]
    },
    {
      id: 'forms',
      title: 'Formulaires',
      icon: '📝',
      description: 'Gestion des formulaires réactifs et validation',
      topics: [
        { id: 'reactive-forms', name: 'Reactive Forms', route: '/documentation/forms/reactive-forms', difficulty: 'Intermédiaire' },
        { id: 'form-builder', name: 'FormBuilder & FormGroup', route: '/documentation/forms/form-builder', difficulty: 'Intermédiaire' },
        { id: 'validation', name: 'Validation & Validators', route: '/documentation/forms/validation', difficulty: 'Intermédiaire' },
        { id: 'form-array', name: 'FormArray (Tableaux Dynamiques)', route: '/documentation/forms/form-array', difficulty: 'Avancé' }
      ]
    },
    {
      id: 'services-di',
      title: 'Services & Dependency Injection',
      icon: '🔧',
      description: 'Services injectables et architecture',
      topics: [
        { id: 'services', name: 'Services & @Injectable', route: '/documentation/services/services', difficulty: 'Intermédiaire' },
        { id: 'di', name: 'Dependency Injection', route: '/documentation/services/dependency-injection', difficulty: 'Intermédiaire' },
        { id: 'inject-function', name: 'inject() Function', route: '/documentation/services/inject-function', difficulty: 'Intermédiaire' }
      ]
    },
    {
      id: 'rxjs',
      title: 'RxJS & Programmation Réactive',
      icon: '🌊',
      description: 'Observables, Subjects et opérateurs RxJS',
      topics: [
        { id: 'observables', name: 'Observables & Observers', route: '/documentation/rxjs/observables', difficulty: 'Intermédiaire' },
        { id: 'subjects', name: 'BehaviorSubject & ReplaySubject', route: '/documentation/rxjs/subjects', difficulty: 'Intermédiaire' },
        { id: 'operators', name: 'Opérateurs RxJS (map, filter, pipe)', route: '/documentation/rxjs/operators', difficulty: 'Avancé' },
        { id: 'subscriptions', name: 'Gestion des Subscriptions', route: '/documentation/rxjs/subscriptions', difficulty: 'Avancé' }
      ]
    },
    {
      id: 'http',
      title: 'Communication HTTP',
      icon: '🌐',
      description: 'HttpClient et appels API',
      topics: [
        { id: 'http-client', name: 'HttpClient', route: '/documentation/http/http-client', difficulty: 'Intermédiaire' },
        { id: 'interceptors', name: 'HTTP Interceptors', route: '/documentation/http/interceptors', difficulty: 'Avancé' }
      ]
    },
    {
      id: 'routing',
      title: 'Routing & Navigation',
      icon: '🗺️',
      description: 'Système de navigation et guards',
      topics: [
        { id: 'router', name: 'Router & Routes', route: '/documentation/routing/router', difficulty: 'Intermédiaire' },
        { id: 'guards', name: 'Route Guards', route: '/documentation/routing/guards', difficulty: 'Avancé' },
        { id: 'lazy-loading', name: 'Lazy Loading', route: '/documentation/routing/lazy-loading', difficulty: 'Avancé' }
      ]
    },
    {
      id: 'typescript',
      title: 'TypeScript Essentials',
      icon: '💎',
      description: 'Concepts TypeScript utilisés dans le projet',
      topics: [
        { id: 'interfaces', name: 'Interfaces & Types', route: '/documentation/typescript/interfaces', difficulty: 'Débutant' },
        { id: 'generics', name: 'Generics', route: '/documentation/typescript/generics', difficulty: 'Intermédiaire' },
        { id: 'decorators', name: 'Decorators (@Input, @Output)', route: '/documentation/typescript/decorators', difficulty: 'Intermédiaire' }
      ]
    },
    {
      id: 'best-practices',
      title: 'Best Practices & Patterns',
      icon: '⭐',
      description: 'Bonnes pratiques et patterns Angular',
      topics: [
        { id: 'architecture', name: 'Architecture & Organisation', route: '/documentation/best-practices/architecture', difficulty: 'Avancé' },
        { id: 'state-management', name: 'State Management', route: '/documentation/best-practices/state-management', difficulty: 'Avancé' },
        { id: 'performance', name: 'Optimisation & Performance', route: '/documentation/best-practices/performance', difficulty: 'Avancé' }
      ]
    }
  ];

  getDifficultyClass(difficulty: string): string {
    const classes: { [key: string]: string } = {
      'Débutant': 'difficulty-beginner',
      'Intermédiaire': 'difficulty-intermediate',
      'Avancé': 'difficulty-advanced'
    };
    return classes[difficulty] || '';
  }

  getTotalTopics(): number {
    return this.courseModules.reduce((total, module) => total + module.topics.length, 0);
  }
}
