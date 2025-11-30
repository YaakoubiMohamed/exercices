import { Routes } from '@angular/router';

export const DOC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./course-plan/course-plan.component').then(m => m.CoursePlanComponent)
  },
  {
    path: 'intro/what-is-angular',
    loadComponent: () => import('./intro/what-is-angular/what-is-angular.component').then(m => m.WhatIsAngularComponent)
  },
  {
    path: 'intro/history',
    loadComponent: () => import('./intro/history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: 'intro/architecture',
    loadComponent: () => import('./intro/architecture/architecture.component.js').then(m => m.ArchitectureComponent)
  },
  {
    path: 'intro/comparison',
    loadComponent: () => import('./intro/comparison/comparison.component.js').then(m => m.ComparisonComponent)
  },
  {
    path: 'intro/ecosystem',
    loadComponent: () => import('./intro/ecosystem/ecosystem.component.js').then(m => m.EcosystemComponent)
  },
  {
    path: 'intro/when-to-use',
    loadComponent: () => import('./intro/when-to-use/when-to-use.component.js').then(m => m.WhenToUseComponent)
  },
  // Angular Fundamentals
  {
    path: 'fundamentals/components',
    loadComponent: () => import('./fundamentals/components/components.component').then(m => m.ComponentsComponent)
  },
  {
    path: 'fundamentals/templates',
    loadComponent: () => import('./fundamentals/templates/templates.component').then(m => m.TemplatesComponent)
  },
  {
    path: 'fundamentals/data-binding',
    loadComponent: () => import('./fundamentals/data-binding/data-binding.component').then(m => m.DataBindingComponent)
  },
  {
    path: 'fundamentals/directives',
    loadComponent: () => import('./fundamentals/directives/directives.component').then(m => m.DirectivesComponent)
  },
  {
    path: 'fundamentals/pipes',
    loadComponent: () => import('./fundamentals/pipes/pipes.component').then(m => m.PipesComponent)
  },
  {
    path: 'fundamentals/lifecycle-hooks',
    loadComponent: () => import('./fundamentals/lifecycle-hooks/lifecycle-hooks.component').then(m => m.LifecycleHooksComponent)
  },
  {
    path: 'fundamentals/input-output',
    loadComponent: () => import('./fundamentals/input-output/input-output.component').then(m => m.InputOutputComponent)
  },
  {
    path: 'fundamentals/content-projection',
    loadComponent: () => import('./fundamentals/content-projection/content-projection.component').then(m => m.ContentProjectionComponent)
  },
  {
    path: 'fundamentals/viewchild-contentchild',
    loadComponent: () => import('./fundamentals/viewchild-contentchild/viewchild-contentchild.component').then(m => m.ViewChildContentChildComponent)
  },
  // Forms
  {
    path: 'forms/reactive-forms',
    loadComponent: () => import('./forms/reactive-forms/reactive-forms.component').then(m => m.ReactiveFormsComponent)
  },
  {
    path: 'forms/form-builder',
    loadComponent: () => import('./forms/form-builder/form-builder.component').then(m => m.FormBuilderComponent)
  },
  {
    path: 'forms/validation',
    loadComponent: () => import('./forms/validation/validation.component').then(m => m.ValidationComponent)
  },
  {
    path: 'forms/form-array',
    loadComponent: () => import('./forms/form-array/form-array.component').then(m => m.FormArrayComponent)
  },
  // Services & DI
  {
    path: 'services/services',
    loadComponent: () => import('./services/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/dependency-injection',
    loadComponent: () => import('./services/dependency-injection/dependency-injection.component').then(m => m.DependencyInjectionComponent)
  },
  {
    path: 'services/inject-function',
    loadComponent: () => import('./services/inject-function/inject-function.component').then(m => m.InjectFunctionComponent)
  },
  // RxJS
  {
    path: 'rxjs/observables',
    loadComponent: () => import('./rxjs/observables/observables.component').then(m => m.ObservablesComponent)
  },
  {
    path: 'rxjs/subjects',
    loadComponent: () => import('./rxjs/subjects/subjects.component').then(m => m.SubjectsComponent)
  },
  {
    path: 'rxjs/operators',
    loadComponent: () => import('./rxjs/operators/operators.component').then(m => m.OperatorsComponent)
  },
  {
    path: 'rxjs/subscriptions',
    loadComponent: () => import('./rxjs/subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent)
  },
  // HTTP
  {
    path: 'http/http-client',
    loadComponent: () => import('./http/http-client/http-client.component').then(m => m.HttpClientComponent)
  },
  {
    path: 'http/interceptors',
    loadComponent: () => import('./http/interceptors/interceptors.component').then(m => m.InterceptorsComponent)
  },
  // Routing
  {
    path: 'routing/router',
    loadComponent: () => import('./routing/router/router.component').then(m => m.RouterComponent)
  },
  {
    path: 'routing/guards',
    loadComponent: () => import('./routing/guards/guards.component').then(m => m.GuardsComponent)
  },
  {
    path: 'routing/lazy-loading',
    loadComponent: () => import('./routing/lazy-loading/lazy-loading.component').then(m => m.LazyLoadingComponent)
  },
  // TypeScript
  {
    path: 'typescript/interfaces',
    loadComponent: () => import('./typescript/interfaces/interfaces.component').then(m => m.InterfacesComponent)
  },
  {
    path: 'typescript/generics',
    loadComponent: () => import('./typescript/generics/generics.component').then(m => m.GenericsComponent)
  },
  {
    path: 'typescript/decorators',
    loadComponent: () => import('./typescript/decorators/decorators.component').then(m => m.DecoratorsComponent)
  },
  // Best Practices
  {
    path: 'best-practices/architecture',
    loadComponent: () => import('./best-practices/architecture/architecture.component').then(m => m.ArchitectureComponent)
  },
  {
    path: 'best-practices/state-management',
    loadComponent: () => import('./best-practices/state-management/state-management.component').then(m => m.StateManagementComponent)
  },
  {
    path: 'best-practices/performance',
    loadComponent: () => import('./best-practices/performance/performance.component').then(m => m.PerformanceComponent)
  }
];
