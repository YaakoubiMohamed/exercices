import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component.js').then(m => m.HomeComponent)
  },
  {
    path: 'exercice1',
    loadComponent: () => import('./exercises/exercice1-notes/notes.component.js').then(m => m.NotesComponent)
  },
  {
    path: 'exercice2',
    loadComponent: () => import('./exercises/exercice2-tasks/todo.component.js').then(m => m.TodoComponent)
  },
  {
    path: 'exercice3',
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./exercises/exercice3-ecommerce/product-list/product-list.component.js').then(m => m.ProductListComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./exercises/exercice3-ecommerce/cart/cart.component.js').then(m => m.CartComponent)
      }
    ]
  },
  {
    path: 'exercice6',
    loadComponent: () => import('./exercises/exercice6-invoice/invoice.component.js').then(m => m.InvoiceComponent)
  },
  {
    path: 'demos/signals',
    loadComponent: () => import('./demos/signals/counter-demo.component.js').then(m => m.CounterDemoComponent)
  },
  {
    path: 'demos/computed-signals',
    loadComponent: () => import('./demos/computed-signals/computed-demo.component.js').then(m => m.ComputedDemoComponent)
  }
];
