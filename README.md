# 📚 Exercices Angular 20 - Formation Complète

Application de formation complète pour maîtriser Angular 20 et ses meilleures pratiques modernes. Ce projet combine des exercices pratiques progressifs avec une documentation interactive exhaustive.

---

## 🎯 Vue d'ensemble du projet

Cette application Angular 20 comprend **deux sections principales** :

### 1. 🏋️ Exercices Pratiques (6 exercices progressifs)
Exercices hands-on pour développer des applications réelles avec Angular 20

### 2. 📖 Documentation Interactive (37 topics)
Guide complet et interactif couvrant tous les aspects d'Angular 20

---

## 🏋️ Section Exercices Pratiques

### Exercice 1 : Calculateur de Notes ⭐ Débutant
**Route:** `/exercice1`

**Fonctionnalités:**
- Calcul automatique de la moyenne de 4 matières
- Détermination de la mention (Très Bien, Bien, Assez Bien, Passable, Insuffisant)
- Validation des notes (0-20)
- Interface réactive avec affichage dynamique

**Technologies:**
- Signals (`signal()`)
- Computed Signals (`computed()`)
- Two-way binding (`[(ngModel)]`)
- FormsModule
- Standalone Components

---

### Exercice 2 : Gestionnaire de Tâches ⭐⭐ Intermédiaire
**Route:** `/exercice2`

**Fonctionnalités:**
- Ajout, modification, suppression de tâches
- Système de priorités (high, medium, low)
- Filtres: Toutes / En cours / Terminées
- Statistiques en temps réel (total, complétées, en cours, taux de complétion)
- Barre de progression visuelle

**Architecture:**
- Service injectable (`TaskService`) avec injection via `inject()`
- Gestion d'état avec RxJS BehaviorSubject
- Observables dérivés pour statistiques
- Séparation logique métier / présentation
- Nouveau control flow (`@for`, `@if`, `@empty`)

---

### Exercice 3 : E-Commerce Complet ⭐⭐⭐ Avancé
**Route:** `/exercice3` (avec sous-routes `/products` et `/cart`)

**Fonctionnalités:**

**Catalogue Produits:**
- Liste de 10+ produits avec images
- Filtrage par catégorie (electronics, clothing, books, food)
- Recherche en temps réel
- Gestion du stock
- Cards produits interactives

**Panier d'Achat:**
- Ajout/suppression d'articles
- Modification des quantités
- Calculs financiers automatiques (sous-total, TVA 20%, total TTC)
- Système de codes promo avec validation (WELCOME10, SAVE20, STUDENT15)
- Montant minimum pour codes promo
- Persistance LocalStorage

**Architecture Multi-Services:**
- `ProductService`: Gestion du catalogue avec signals
- `CartService`: Logique métier du panier avec observables
- Communication parent-child avec `input()` et `output()`
- Reactive Forms avec validation personnalisée
- Computed signals pour calculs dérivés

**Composants:**
- `ProductListComponent`: Affichage avec filtres
- `ProductCardComponent`: Card réutilisable
- `CartComponent`: Panier avec formulaire promo
- `EcommerceNavComponent`: Navigation

---

### Exercice 4 : Application Météo 🌐 (Documentation disponible)
**Fonctionnalités prévues:**
- Intégration API OpenWeatherMap
- Recherche de villes avec debouncing
- Villes favorites avec LocalStorage
- Prévisions météo 5 jours
- HTTP Interceptor pour gestion des erreurs
- Pipe personnalisé pour conversion température
- États de chargement et gestion d'erreurs

---

### Exercice 5 : Authentification & Guards 🔐 (Documentation disponible)
**Fonctionnalités prévues:**
- Système de login/logout complet
- Gestion JWT tokens
- HTTP Interceptor pour authentification
- Route Guards (Auth Guard, Role Guard)
- Gestion des rôles (admin, user, guest)
- ReturnUrl après login
- Directive structurelle personnalisée `*hasRole`
- Lazy loading des composants protégés

---

### Exercice 6 : Générateur de Factures 💰 (Mini Défi)
**Fonctionnalités:**
- Formulaire client (nom, email, adresse)
- Ajout dynamique d'articles avec FormArray
- Calculs automatiques (sous-total HT, TVA, total TTC)
- Modification du taux de TVA
- Validation complète des formulaires
- Statistiques (nombre d'articles, quantité totale)

---

## 📖 Section Documentation Interactive

### 🎓 Module 1 : Introduction à Angular (6 topics)

**1.1 Qu'est-ce qu'Angular ?**
- Définition et philosophie
- Framework complet vs bibliothèque
- TypeScript first
- Écosystème intégré

**1.2 Histoire d'Angular**
- AngularJS (2010) → Angular 2+ (2016)
- Évolutions majeures
- Angular 20 (2025)

**1.3 Architecture Angular**
- Composants, Templates, Services
- Dependency Injection
- Modules vs Standalone
- Change Detection

**1.4 Comparaison avec autres frameworks**
- Angular vs React vs Vue.js
- Avantages et cas d'usage
- Courbe d'apprentissage

**1.5 Écosystème Angular**
- Angular CLI
- Angular Material
- RxJS
- TypeScript

**1.6 Quand utiliser Angular**
- Applications d'entreprise
- PWA
- Projets complexes
- Grandes équipes

---

### 🧩 Module 2 : Fondamentaux (9 topics)

**2.1 Composants**
- Standalone components
- Décorateur `@Component`
- Lifecycle
- Communication

**2.2 Templates**
- Syntaxe de template
- Binding de données
- Références locales
- Template variables

**2.3 Data Binding**
- Interpolation `{{ }}`
- Property binding `[property]`
- Event binding `(event)`
- Two-way binding `[(ngModel)]`

**2.4 Directives**
- Directives structurelles (`@if`, `@for`, `@switch`)
- Directives d'attribut (`ngClass`, `ngStyle`)
- Directives personnalisées

**2.5 Pipes**
- Pipes natifs (date, currency, json, etc.)
- Pipes personnalisés
- Pure vs Impure pipes
- Async pipe

**2.6 Lifecycle Hooks**
- `ngOnInit`, `ngOnChanges`, `ngOnDestroy`
- `ngAfterViewInit`, `ngAfterContentInit`
- Ordre d'exécution
- Cas d'usage

**2.7 Input & Output**
- `@Input()` pour props
- `@Output()` pour événements
- EventEmitter
- Communication parent-enfant

**2.8 Content Projection**
- `<ng-content>`
- Multi-slot projection
- Conditional projection

**2.9 ViewChild & ContentChild**
- Accès aux éléments du DOM
- Accès aux composants enfants
- `@ViewChild`, `@ViewChildren`
- `@ContentChild`, `@ContentChildren`

---

### 📝 Module 3 : Formulaires (4 topics)

**3.1 Reactive Forms**
- FormControl, FormGroup, FormArray
- Avantages des formulaires réactifs
- Typage strict
- Validation asynchrone

**3.2 FormBuilder**
- Service FormBuilder
- Syntaxe simplifiée
- Configuration par défaut
- Groupes imbriqués

**3.3 Validation**
- Validators natifs (required, email, minLength, etc.)
- Custom validators
- Async validators
- Messages d'erreur dynamiques

**3.4 FormArray**
- Tableaux dynamiques
- Ajout/suppression d'éléments
- Validation de groupes
- Cas d'usage (factures, lignes de commande)

---

### 🔧 Module 4 : Services & DI (3 topics)

**4.1 Services**
- Création de services
- `@Injectable({ providedIn: 'root' })`
- Séparation des responsabilités
- Logique métier

**4.2 Dependency Injection**
- Système DI d'Angular
- Providers
- Hiérarchie d'injection
- Tree-shakable providers

**4.3 Fonction inject()**
- Nouvelle API Angular 20
- Injection dans constructeurs
- Injection dans fonctions
- Simplification du code

---

### 🔄 Module 5 : RxJS & Observables (4 topics)

**5.1 Observables**
- Programmation réactive
- Observable vs Promise
- Création d'observables
- Operators de base

**5.2 Subjects**
- BehaviorSubject
- ReplaySubject
- AsyncSubject
- Différences et cas d'usage

**5.3 Operators**
- Transformation (map, switchMap, mergeMap)
- Filtrage (filter, take, debounceTime)
- Combinaison (combineLatest, forkJoin)
- Gestion d'erreurs (catchError, retry)

**5.4 Subscriptions**
- Gestion des souscriptions
- Unsubscribe patterns
- takeUntil, take
- Async pipe

---

### 🌐 Module 6 : HTTP & APIs (2 topics)

**6.1 HttpClient**
- Configuration provideHttpClient()
- Méthodes GET, POST, PUT, DELETE
- Headers et paramètres
- Typage des réponses
- Gestion des erreurs

**6.2 HTTP Interceptors**
- Intercepteurs fonctionnels
- Ajout de tokens JWT
- Gestion globale des erreurs
- Logging des requêtes
- Retry logic

---

### 🛣️ Module 7 : Routing & Navigation (3 topics)

**7.1 Router**
- Configuration des routes
- RouterLink, RouterOutlet
- Navigation programmatique
- Paramètres de route
- Query parameters

**7.2 Guards**
- CanActivate, CanDeactivate
- Guards fonctionnels
- Protection des routes
- Redirections conditionnelles

**7.3 Lazy Loading**
- loadComponent()
- Optimisation du bundle
- Code splitting
- Preloading strategies

---

### 📘 Module 8 : TypeScript Avancé (3 topics)

**8.1 Interfaces**
- Définition de contrats
- Types vs Interfaces
- Extension d'interfaces
- Types génériques

**8.2 Generics**
- Fonctions génériques
- Classes génériques
- Contraintes de types
- Utilité pratique

**8.3 Decorators**
- `@Component`, `@Injectable`
- `@Input`, `@Output`
- `@ViewChild`, `@ContentChild`
- Decorators personnalisés

---

### ⚡ Module 9 : Best Practices (3 topics)

**9.1 Architecture**
- Structure de projet
- Feature modules
- Shared modules
- Core modules
- Smart vs Presentational components

**9.2 State Management**
- Signals natifs
- Services avec BehaviorSubject
- NgRx (optionnel)
- Patterns de gestion d'état

**9.3 Performance**
- OnPush Change Detection
- TrackBy functions
- Lazy loading
- Optimisation des bundles
- Preloading strategies
- Virtual scrolling

---

## 🏗️ Structure du Projet

```
src/app/
├── home/                                    # Page d'accueil avec navigation
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.css
│
├── exercises/                               # 📝 Section Exercices
│   ├── exercice1-notes/                    # Calculateur de notes
│   │   ├── notes.component.ts
│   │   ├── notes.component.html
│   │   └── notes.component.css
│   │
│   ├── exercice2-tasks/                    # Gestionnaire de tâches
│   │   ├── task.service.ts
│   │   ├── todo.component.ts
│   │   ├── todo.component.html
│   │   └── todo.component.css
│   │
│   └── exercice3-ecommerce/                # E-Commerce
│       ├── cart.service.ts
│       ├── product.service.ts
│       ├── cart/
│       ├── ecommerce-nav/
│       ├── product-card/
│       └── product-list/
│
├── documentation/                           # 📖 Section Documentation
│   ├── doc.routes.ts                       # 37 routes de documentation
│   │
│   ├── course-plan/                        # Plan de cours interactif
│   │   └── course-plan.component.ts
│   │
│   ├── intro/                              # Module 1: Introduction (6 topics)
│   │   ├── what-is-angular/
│   │   ├── history/
│   │   ├── architecture/
│   │   ├── comparison/
│   │   ├── ecosystem/
│   │   └── when-to-use/
│   │
│   ├── fundamentals/                       # Module 2: Fondamentaux (9 topics)
│   │   ├── components/
│   │   ├── templates/
│   │   ├── data-binding/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── lifecycle-hooks/
│   │   ├── input-output/
│   │   ├── content-projection/
│   │   └── viewchild-contentchild/
│   │
│   ├── forms/                              # Module 3: Formulaires (4 topics)
│   │   ├── reactive-forms/
│   │   ├── form-builder/
│   │   ├── validation/
│   │   └── form-array/
│   │
│   ├── services/                           # Module 4: Services & DI (3 topics)
│   │   ├── services/
│   │   ├── dependency-injection/
│   │   └── inject-function/
│   │
│   ├── rxjs/                               # Module 5: RxJS (4 topics)
│   │   ├── observables/
│   │   ├── subjects/
│   │   ├── operators/
│   │   └── subscriptions/
│   │
│   ├── http/                               # Module 6: HTTP (2 topics)
│   │   ├── http-client/
│   │   └── interceptors/
│   │
│   ├── routing/                            # Module 7: Routing (3 topics)
│   │   ├── router/
│   │   ├── guards/
│   │   └── lazy-loading/
│   │
│   ├── typescript/                         # Module 8: TypeScript (3 topics)
│   │   ├── interfaces/
│   │   ├── generics/
│   │   └── decorators/
│   │
│   └── best-practices/                     # Module 9: Best Practices (3 topics)
│       ├── architecture/
│       ├── state-management/
│       └── performance/
│
├── app.ts                                  # Composant racine
├── app.html
├── app.css
├── app.config.ts                           # Configuration globale
└── app.routes.ts                           # Routes principales
```

---

## 🎨 Fonctionnalités de l'Interface

### Navigation Globale
- Header avec logo et titre
- Menu de navigation (Accueil / Exercices / Documentation)
- Design moderne et responsive
- Thème cohérent dans toute l'application

### Page d'Accueil
- Hero section avec titre et description
- Grille de concepts clés (Signals, Reactive Forms, HttpClient, etc.)
- Cards d'exercices cliquables avec:
  - Icône distinctive
  - Titre et description
  - Badge de difficulté
  - Tags de technologies
  - Bouton de démarrage

### Documentation Interactive
- Plan de cours avec navigation rapide
- Fil d'Ariane (breadcrumb) sur chaque page
- Navigation précédent/suivant
- Mise en page boxed professionnelle
- Exemples de code avec coloration syntaxique (VSCode style)
- Thème sombre pour les blocs de code
- Highlight.js pour la mise en évidence du code

### Design System
- Bootstrap pour le layout responsive
- Variables CSS personnalisées
- Palette de couleurs cohérente
- Typographie optimisée
- Espacements harmonieux

---

## 🚀 Technologies & Concepts Angular 20

### Nouveautés Angular 20
- ✅ **Signals & Computed Signals** - Gestion d'état réactive native
- ✅ **Nouveau Control Flow** - `@if`, `@for`, `@switch`, `@empty`
- ✅ **Standalone Components** - Plus besoin de NgModules
- ✅ **Fonction inject()** - Injection de dépendances simplifiée
- ✅ **input() & output()** - Nouvelles APIs pour composants

### Formulaires
- ✅ **Reactive Forms** - FormControl, FormGroup, FormArray
- ✅ **FormBuilder** - Construction simplifiée
- ✅ **Validators** - Natifs et personnalisés
- ✅ **Validation asynchrone**
- ✅ **FormArray dynamique**

### Gestion d'État
- ✅ **RxJS** - Observables, Subjects, Operators
- ✅ **BehaviorSubject** - State management
- ✅ **Computed values** - Calculs dérivés
- ✅ **LocalStorage** - Persistance

### HTTP & APIs
- ✅ **HttpClient** - Intégration API REST
- ✅ **HTTP Interceptors** - Middleware
- ✅ **Gestion des erreurs**
- ✅ **Retry logic**

### Routing
- ✅ **Lazy Loading** - Optimisation du chargement
- ✅ **Route Guards** - Protection des routes
- ✅ **Paramètres de route**
- ✅ **Navigation programmatique**

### Architecture & Best Practices
- ✅ **Service Layer** - Séparation des responsabilités
- ✅ **Dependency Injection** - Couplage faible
- ✅ **Composants réutilisables**
- ✅ **Smart vs Presentational**
- ✅ **TypeScript strict**

---

## 📚 Documentation Complémentaire

- **[td.md](./td.md)** - Énoncés détaillés des 6 exercices avec code complet
- **[GUIDE.md](./mds/GUIDE.md)** - Guide de démarrage rapide
- **Documentation interactive** - Accessible via `/documentation` dans l'app

---

## 🎯 Objectifs Pédagogiques

### Pour Débutants
1. Comprendre les fondamentaux d'Angular 20
2. Maîtriser les Signals et Computed Signals
3. Créer des composants standalone
4. Gérer les formulaires avec FormsModule et Reactive Forms

### Pour Intermédiaires
1. Architecture de services injectables
2. Gestion d'état avec RxJS
3. Communication entre composants
4. Nouveau control flow (@if, @for)
5. Validation de formulaires avancée

### Pour Avancés
1. Architecture multi-services complexe
2. HTTP Interceptors
3. Route Guards et authentification
4. Optimisation des performances
5. State management patterns
6. Best practices d'entreprise

---

## ⚙️ Installation & Démarrage

### Prérequis
- Node.js 18+ et npm
- Angular CLI 20.3.8

### Installation
```bash
npm install
```

### Lancer le serveur de développement
```bash
ng serve
```

Ouvrez votre navigateur à `http://localhost:4200/`

### Build de production
```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

### Tests
```bash
ng test
```

---

## 🎓 Progression Suggérée

1. **Exercice 1** (Débutant) - Maîtriser les Signals et Computed
2. **Exercice 2** (Intermédiaire) - Services et Dependency Injection
3. **Exercice 6** (Mini Défi) - FormArray et formulaires dynamiques
4. **Exercice 3** (Avancé) - Architecture multi-services
5. **Exercice 4** (Avancé) - HttpClient et APIs
6. **Exercice 5** (Expert) - Authentification et sécurité

---

## 📊 Résumé des Concepts Couverts

### Core Angular 20
- Standalone Components
- Signals & Computed Signals
- Nouveau Control Flow (@if, @for, @switch, @empty)
- inject() function
- input() & output()

### Formulaires
- FormsModule (Two-way binding)
- Reactive Forms (FormControl, FormGroup, FormArray)
- FormBuilder
- Validators (natifs et personnalisés)
- Validation asynchrone

### State Management
- RxJS (Observables, BehaviorSubject, Operators)
- Service-based state
- LocalStorage persistence
- Derived state avec computed

### HTTP & APIs
- HttpClient
- HTTP Interceptors
- Error handling
- Request/Response typing

### Routing & Navigation
- RouterLink, RouterOutlet
- Lazy loading avec loadComponent()
- Route Guards (CanActivate)
- Navigation programmatique

### Architecture
- Service Layer pattern
- Dependency Injection
- Smart vs Presentational components
- Multi-module architecture

### TypeScript
- Interfaces et Types
- Generics
- Decorators
- Strict typing

### Best Practices
- Component architecture
- Performance optimization
- State management patterns
- Code organization

---

## 📱 Fonctionnalités Techniques

### Interface Utilisateur
- Design responsive (Bootstrap)
- Navigation intuitive
- Breadcrumb navigation
- Dark theme pour code blocks
- Syntax highlighting (Highlight.js avec thème VSCode)
- Cards interactives
- Formulaires validés
- Messages d'erreur contextuels

### Performance
- Lazy loading des routes
- Code splitting automatique
- Optimisation du bundle
- Change detection optimisée

### Developer Experience
- TypeScript strict mode
- Hot module replacement
- Erreurs de compilation détaillées
- Structure de projet claire

---

## 🔗 Ressources Additionnelles

- [Documentation officielle Angular](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Angular CLI](https://angular.dev/tools/cli)

---

## 📝 License

Ce projet est destiné à des fins éducatives.

---

**Bon apprentissage avec Angular 20!** 🚀
