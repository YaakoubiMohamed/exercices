import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather-explanation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './weather-explanation.component.html',
  styleUrl: './weather-explanation.component.css'
})
export class WeatherExplanationComponent {
  
  steps = [
    {
      number: 1,
      title: 'Définition des Modèles de Données',
      icon: '📐',
      description: 'Création des interfaces TypeScript pour structurer les données',
      concepts: ['Interfaces TypeScript', 'Types personnalisés', 'Typage strict'],
      code: `// models/weather.models.ts
interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  timestamp: Date;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface WeatherState {
  data: WeatherData | null;
  status: LoadingState;
  error: string | null;
}`
    },
    {
      number: 2,
      title: 'Configuration de l\'Environnement',
      icon: '⚙️',
      description: 'Stockage sécurisé de la clé API dans les fichiers d\'environnement',
      concepts: ['Environment files', 'Configuration', 'Sécurité API'],
      code: `// environments/environment.ts
export const environment = {
  production: false,
  openWeatherMapApiKey: 'YOUR_API_KEY'
};

// Importer dans le service
import { environment } from '../../../../environments/environment';`
    },
    {
      number: 3,
      title: 'Création du Service Météo',
      icon: '🔧',
      description: 'Service injectable avec HttpClient et RxJS pour gérer les appels API',
      concepts: ['@Injectable', 'HttpClient', 'BehaviorSubject', 'Observables'],
      code: `@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private readonly API_KEY = environment.openWeatherMapApiKey;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';
  
  // Subject pour la ville recherchée
  private cityQuerySubject = new BehaviorSubject<string>('Paris');
  
  // État de chargement
  private stateSubject = new BehaviorSubject<WeatherState>({
    data: null,
    status: 'idle',
    error: null
  });
}`
    },
    {
      number: 4,
      title: 'Implémentation des Opérateurs RxJS',
      icon: '🔄',
      description: 'Utilisation des opérateurs RxJS pour gérer le flux de données',
      concepts: ['debounceTime', 'distinctUntilChanged', 'switchMap', 'catchError', 'map'],
      code: `// Observable pour les données météo avec debounce
readonly weatherData$ = this.cityQuerySubject.pipe(
  debounceTime(500),           // Attendre 500ms après la dernière frappe
  distinctUntilChanged(),      // Ignorer si même valeur
  tap(() => this.setLoading()),
  switchMap(city =>            // Annuler la requête précédente
    this.fetchWeather(city)
  ),
  tap(data => this.setSuccess(data)),
  catchError(error => {
    this.setError(error.message);
    return of(null);
  }),
  shareReplay(1)               // Partager le résultat
);`
    },
    {
      number: 5,
      title: 'Appels HTTP à l\'API',
      icon: '🌐',
      description: 'Requêtes HTTP vers OpenWeatherMap avec transformation des données',
      concepts: ['HttpClient.get()', 'Params HTTP', 'Transformation de données'],
      code: `private fetchWeather(city: string): Observable<WeatherData> {
  const url = \`\${this.BASE_URL}/weather\`;
  const params = {
    q: city,
    appid: this.API_KEY,
    units: 'metric',
    lang: 'fr'
  };
  
  return this.http.get<any>(url, { params }).pipe(
    map(response => this.transformResponse(response)),
    catchError(error => {
      if (error.status === 404) {
        throw new Error('Ville non trouvée');
      }
      throw new Error('Erreur de connexion');
    })
  );
}`
    },
    {
      number: 6,
      title: 'HTTP Interceptor',
      icon: '🛡️',
      description: 'Intercepteur pour gérer les erreurs HTTP de manière centralisée',
      concepts: ['HttpInterceptorFn', 'Gestion des erreurs', 'Logging'],
      code: `// interceptors/weather.interceptor.ts
export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🌐 HTTP Request:', req.url);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';
      
      if (error.status === 404) {
        errorMessage = 'Ville non trouvée';
      } else if (error.status === 401) {
        errorMessage = 'Clé API invalide';
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
};`
    },
    {
      number: 7,
      title: 'Pipe Personnalisé',
      icon: '🔧',
      description: 'Création d\'un pipe pour formater les températures',
      concepts: ['@Pipe', 'PipeTransform', 'Standalone pipe'],
      code: `@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | null, unit: 'C' | 'F' = 'C'): string {
    if (value === null) return '--°' + unit;
    
    let temp = value;
    if (unit === 'F') {
      temp = (value * 9/5) + 32;
    }
    return \`\${Math.round(temp)}°\${unit}\`;
  }
}`
    },
    {
      number: 8,
      title: 'Service des Favoris',
      icon: '⭐',
      description: 'Gestion des villes favorites avec LocalStorage',
      concepts: ['LocalStorage', 'BehaviorSubject', 'Persistance'],
      code: `@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  readonly favoriteCities$ = this.favoritesSubject.asObservable();
  
  constructor() {
    this.loadFavorites();  // Charger depuis LocalStorage
  }
  
  addFavorite(city: string): void {
    const current = this.favoritesSubject.value;
    if (!current.includes(city)) {
      this.favoritesSubject.next([...current, city]);
      this.saveFavorites();
    }
  }
  
  private saveFavorites(): void {
    localStorage.setItem('weather-favorites', 
      JSON.stringify(this.favoritesSubject.value));
  }
}`
    },
    {
      number: 9,
      title: 'Composant de Recherche',
      icon: '🔍',
      description: 'Input réactif avec debounce pour rechercher des villes',
      concepts: ['FormControl', 'valueChanges', 'debounceTime', 'filter'],
      code: `@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class WeatherSearchComponent implements OnInit {
  private weatherService = inject(WeatherService);
  searchControl = new FormControl('');
  
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query !== null && query.length >= 2)
    ).subscribe(city => {
      this.weatherService.searchCity(city!);
    });
  }
}`
    },
    {
      number: 10,
      title: 'Affichage des Données',
      icon: '📊',
      description: 'Composant d\'affichage avec gestion des états (loading, error, success)',
      concepts: ['async pipe', '@if/@else', 'Gestion des états', 'Template syntax'],
      code: `@Component({
  selector: 'app-weather-display',
  template: \`
    @if (state$ | async; as state) {
      @if (state.status === 'loading') {
        <div class="loading">Chargement...</div>
      }
      
      @if (state.status === 'error') {
        <div class="error">{{ state.error }}</div>
      }
      
      @if (state.status === 'success' && state.data) {
        <div class="weather-card">
          <h2>{{ state.data.city }}</h2>
          <p>{{ state.data.temperature | temperature }}</p>
        </div>
      }
    }
  \`
})`
    },
    {
      number: 11,
      title: 'Prévisions Météo',
      icon: '📅',
      description: 'Affichage des prévisions sur 5 jours avec @for',
      concepts: ['@for avec track', 'DatePipe avec locale', 'switchMap'],
      code: `// Prévisions déclenchées par le changement de weatherData$
forecast$ = this.weatherService.weatherData$.pipe(
  switchMap(data => {
    if (data) {
      return this.weatherService.getForecast(data.city);
    }
    return of([]);
  })
);

// Template
@for (day of forecast$ | async; track day.date) {
  <div class="forecast-card">
    <span>{{ day.date | date:'EEE':'':'fr' }}</span>
    <span>{{ day.tempMax | temperature }}</span>
  </div>
}`
    },
    {
      number: 12,
      title: 'Configuration Globale',
      icon: '⚡',
      description: 'Configuration de l\'application avec providers',
      concepts: ['ApplicationConfig', 'provideHttpClient', 'withInterceptors', 'LOCALE_ID'],
      code: `// app.config.ts
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([weatherInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};`
    }
  ];

  architectureDiagram = `
┌─────────────────────────────────────────────────────────────────┐
│                        WeatherComponent                          │
│  ┌─────────────┐  ┌─────────────────┐  ┌──────────────────┐    │
│  │ SearchComp  │  │  DisplayComp    │  │  ForecastComp    │    │
│  └──────┬──────┘  └────────┬────────┘  └────────┬─────────┘    │
│         │                  │                     │               │
└─────────┼──────────────────┼─────────────────────┼───────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVICES                                 │
│  ┌─────────────────────┐      ┌─────────────────────┐          │
│  │   WeatherService    │      │  FavoritesService   │          │
│  │  ─────────────────  │      │  ─────────────────  │          │
│  │  • BehaviorSubject  │      │  • BehaviorSubject  │          │
│  │  • weatherData$     │      │  • LocalStorage     │          │
│  │  • state$           │      │  • favoriteCities$  │          │
│  └──────────┬──────────┘      └─────────────────────┘          │
│             │                                                    │
└─────────────┼────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HTTP LAYER                                  │
│  ┌─────────────────┐    ┌─────────────────────────────┐        │
│  │  HttpClient     │───▶│  weatherInterceptor         │        │
│  └─────────────────┘    │  (Gestion erreurs globale)  │        │
│                         └─────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OPENWEATHERMAP API                            │
│  GET /weather?q=Paris&appid=KEY&units=metric&lang=fr            │
│  GET /forecast?q=Paris&appid=KEY&units=metric&lang=fr           │
└─────────────────────────────────────────────────────────────────┘
  `;

  // Dictionnaire des mots-clés avec explications détaillées
  keywords = [
    // === ANGULAR CORE ===
    {
      category: 'Angular Core',
      items: [
        {
          keyword: '@Component',
          description: 'Décorateur qui marque une classe comme un composant Angular. Il définit les métadonnées du composant.',
          example: `@Component({
  selector: 'app-weather',      // Tag HTML pour utiliser ce composant
  standalone: true,              // Composant autonome (sans NgModule)
  imports: [CommonModule],       // Dépendances du composant
  templateUrl: './weather.html', // Fichier HTML du template
  styleUrl: './weather.css'      // Fichier CSS des styles
})
export class WeatherComponent { }`,
          usage: 'Chaque composant Angular doit avoir ce décorateur'
        },
        {
          keyword: '@Injectable',
          description: 'Décorateur qui marque une classe comme injectable. Permet à Angular de créer et injecter des instances de cette classe.',
          example: `@Injectable({ 
  providedIn: 'root'  // Singleton disponible dans toute l'app
})
export class WeatherService { }`,
          usage: 'Utilisé pour les services, permet l\'injection de dépendances'
        },
        {
          keyword: '@Pipe',
          description: 'Décorateur qui définit un pipe personnalisé pour transformer des données dans les templates.',
          example: `@Pipe({
  name: 'temperature',  // Nom utilisé dans le template
  standalone: true      // Pipe autonome
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number): string {
    return value + '°C';
  }
}`,
          usage: 'Dans le template: {{ 25 | temperature }} → "25°C"'
        },
        {
          keyword: 'inject()',
          description: 'Fonction pour injecter des dépendances dans une classe. Alternative moderne au constructeur.',
          example: `export class WeatherService {
  // Ancienne méthode (constructeur)
  // constructor(private http: HttpClient) { }
  
  // Nouvelle méthode (inject)
  private http = inject(HttpClient);
}`,
          usage: 'Préféré dans Angular 14+ car plus concis et flexible'
        },
        {
          keyword: 'standalone: true',
          description: 'Option qui rend un composant/pipe/directive autonome, sans avoir besoin d\'un NgModule.',
          example: `@Component({
  standalone: true,
  imports: [CommonModule, FormsModule]  // Imports directs
})`,
          usage: 'Recommandé dans Angular 15+. Simplifie l\'architecture.'
        },
        {
          keyword: 'OnInit / ngOnInit',
          description: 'Interface et méthode de cycle de vie appelée après l\'initialisation des propriétés du composant.',
          example: `export class SearchComponent implements OnInit {
  ngOnInit(): void {
    // Initialisation après la création du composant
    this.loadData();
  }
}`,
          usage: 'Pour les initialisations qui nécessitent que les inputs soient définis'
        },
        {
          keyword: 'OnDestroy / ngOnDestroy',
          description: 'Interface et méthode appelée juste avant la destruction du composant.',
          example: `export class SearchComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();  // Nettoyage des subscriptions
  }
}`,
          usage: 'Essentiel pour éviter les fuites de mémoire (memory leaks)'
        }
      ]
    },
    // === ANGULAR TEMPLATE SYNTAX ===
    {
      category: 'Template Syntax (Angular 17+)',
      items: [
        {
          keyword: '@if / @else',
          description: 'Nouvelle syntaxe de contrôle de flux pour les conditions dans les templates.',
          example: `@if (isLoading) {
  <div class="spinner">Chargement...</div>
} @else if (hasError) {
  <div class="error">Erreur!</div>
} @else {
  <div class="content">Contenu</div>
}`,
          usage: 'Remplace *ngIf. Plus lisible et performant.'
        },
        {
          keyword: '@for / track',
          description: 'Nouvelle syntaxe pour les boucles. "track" est obligatoire pour l\'optimisation.',
          example: `@for (city of cities; track city.id) {
  <div class="city-card">{{ city.name }}</div>
} @empty {
  <p>Aucune ville trouvée</p>
}`,
          usage: 'Remplace *ngFor. track identifie chaque élément pour le DOM.'
        },
        {
          keyword: '@empty',
          description: 'Block affiché quand une boucle @for n\'a aucun élément.',
          example: `@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p class="no-data">Liste vide</p>
}`,
          usage: 'Évite un @if supplémentaire pour gérer les listes vides'
        },
        {
          keyword: 'async pipe',
          description: 'Pipe qui souscrit automatiquement à un Observable et se désinscrit automatiquement.',
          example: `<!-- Souscription automatique et gestion du cycle de vie -->
<div>{{ weatherData$ | async }}</div>

<!-- Avec alias pour réutiliser -->
@if (weatherData$ | async; as data) {
  <p>{{ data.city }}: {{ data.temperature }}°C</p>
}`,
          usage: 'Évite les subscriptions manuelles et les memory leaks'
        },
        {
          keyword: '{{ interpolation }}',
          description: 'Syntaxe pour afficher des valeurs dans le template.',
          example: `<h1>{{ city.name }}</h1>
<p>Température: {{ temperature | temperature }}</p>
<p>{{ 1 + 1 }}</p>  <!-- Expressions supportées -->`,
          usage: 'Affiche la valeur d\'une expression dans le HTML'
        },
        {
          keyword: '[property]',
          description: 'Property binding - Lie une propriété du DOM à une expression.',
          example: `<img [src]="imageUrl" [alt]="description">
<button [disabled]="isLoading">Envoyer</button>
<div [class.active]="isActive">...</div>`,
          usage: 'Mise à jour dynamique des propriétés HTML'
        },
        {
          keyword: '(event)',
          description: 'Event binding - Écoute les événements du DOM.',
          example: `<button (click)="search()">Rechercher</button>
<input (input)="onInput($event)">
<form (submit)="onSubmit()">`,
          usage: 'Réagir aux interactions utilisateur'
        }
      ]
    },
    // === RXJS ===
    {
      category: 'RxJS - Observables',
      items: [
        {
          keyword: 'Observable',
          description: 'Représente un flux de données asynchrone. Peut émettre plusieurs valeurs au fil du temps.',
          example: `// Création d'un Observable
const weather$ = new Observable<WeatherData>(observer => {
  observer.next(data);     // Émet une valeur
  observer.complete();     // Termine le flux
  observer.error(err);     // Émet une erreur
});

// Utilisation
weather$.subscribe(data => console.log(data));`,
          usage: 'Base de la programmation réactive dans Angular'
        },
        {
          keyword: 'BehaviorSubject',
          description: 'Type spécial d\'Observable qui garde la dernière valeur émise et l\'émet immédiatement aux nouveaux abonnés.',
          example: `// Création avec valeur initiale obligatoire
private citySubject = new BehaviorSubject<string>('Paris');

// Émettre une nouvelle valeur
this.citySubject.next('London');

// Lire la valeur actuelle (synchrone)
const current = this.citySubject.value;  // 'London'

// Convertir en Observable (lecture seule)
readonly city$ = this.citySubject.asObservable();`,
          usage: 'Idéal pour gérer l\'état de l\'application'
        },
        {
          keyword: 'Subject',
          description: 'Observable qui permet d\'émettre des valeurs depuis l\'extérieur.',
          example: `private destroy$ = new Subject<void>();

// Émettre
this.destroy$.next();

// Terminer
this.destroy$.complete();`,
          usage: 'Pour créer des événements personnalisés'
        },
        {
          keyword: 'subscribe()',
          description: 'Méthode pour s\'abonner à un Observable et recevoir ses valeurs.',
          example: `this.weatherService.weatherData$.subscribe({
  next: (data) => console.log('Données:', data),
  error: (err) => console.error('Erreur:', err),
  complete: () => console.log('Terminé')
});`,
          usage: 'Déclenche l\'exécution de l\'Observable'
        },
        {
          keyword: 'of()',
          description: 'Crée un Observable qui émet les valeurs passées en argument puis se termine.',
          example: `import { of } from 'rxjs';

const data$ = of('Paris', 'London', 'Tokyo');
// Émet: 'Paris' → 'London' → 'Tokyo' → complete

// Utilisé pour retourner une valeur par défaut
catchError(err => of(null))  // Retourne null en cas d'erreur`,
          usage: 'Créer rapidement un Observable à partir de valeurs'
        }
      ]
    },
    // === RXJS OPERATORS ===
    {
      category: 'RxJS - Opérateurs',
      items: [
        {
          keyword: 'pipe()',
          description: 'Méthode pour chaîner plusieurs opérateurs RxJS sur un Observable.',
          example: `this.searchInput$.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  switchMap(query => this.search(query))
).subscribe(results => { });`,
          usage: 'Composition fonctionnelle des opérateurs'
        },
        {
          keyword: 'debounceTime()',
          description: 'Attend un délai après la dernière émission avant de continuer. Ignore les valeurs pendant le délai.',
          example: `// Input utilisateur: a-b-c----d-e----
// Avec debounceTime(300):  ----c------e----

searchControl.valueChanges.pipe(
  debounceTime(500)  // Attend 500ms de pause
)`,
          usage: 'Éviter les requêtes à chaque frappe clavier'
        },
        {
          keyword: 'distinctUntilChanged()',
          description: 'N\'émet que si la valeur est différente de la précédente.',
          example: `// Input: 'Paris' → 'Paris' → 'London' → 'London'
// Output: 'Paris' → 'London'

searchInput$.pipe(
  distinctUntilChanged()  // Ignore les doublons consécutifs
)`,
          usage: 'Éviter les requêtes inutiles pour la même valeur'
        },
        {
          keyword: 'switchMap()',
          description: 'Transforme chaque valeur en un nouvel Observable et annule le précédent.',
          example: `// Si l'utilisateur tape rapidement:
// 'Par' → requête 1 lancée
// 'Pari' → requête 1 ANNULÉE, requête 2 lancée
// 'Paris' → requête 2 ANNULÉE, requête 3 lancée

searchQuery$.pipe(
  switchMap(query => this.httpClient.get(url))
)`,
          usage: 'Essentiel pour les recherches - évite les race conditions'
        },
        {
          keyword: 'map()',
          description: 'Transforme chaque valeur émise par l\'Observable.',
          example: `// Transformer la réponse API en notre modèle
this.http.get<ApiResponse>(url).pipe(
  map(response => ({
    city: response.name,
    temperature: response.main.temp
  }))
)`,
          usage: 'Transformation de données'
        },
        {
          keyword: 'filter()',
          description: 'Filtre les valeurs qui ne satisfont pas une condition.',
          example: `searchInput$.pipe(
  filter(query => query !== null),
  filter(query => query.length >= 2)  // Min 2 caractères
)`,
          usage: 'Ignorer les valeurs non pertinentes'
        },
        {
          keyword: 'tap()',
          description: 'Effectue une action secondaire sans modifier la valeur (side effect).',
          example: `data$.pipe(
  tap(data => console.log('Reçu:', data)),
  tap(() => this.isLoading = false),
  tap(data => this.cache.set(data))
)`,
          usage: 'Logging, mise à jour d\'état, debugging'
        },
        {
          keyword: 'catchError()',
          description: 'Intercepte les erreurs et permet de les gérer ou de retourner une valeur de secours.',
          example: `this.http.get(url).pipe(
  catchError(error => {
    console.error('Erreur:', error);
    
    // Option 1: Retourner une valeur par défaut
    return of(null);
    
    // Option 2: Propager une erreur personnalisée
    return throwError(() => new Error('Ville non trouvée'));
  })
)`,
          usage: 'Gestion d\'erreurs sans casser le flux'
        },
        {
          keyword: 'shareReplay()',
          description: 'Partage le résultat entre tous les abonnés et rejoue les dernières valeurs.',
          example: `// Sans shareReplay: 3 abonnés = 3 requêtes HTTP
// Avec shareReplay(1): 3 abonnés = 1 requête HTTP

weatherData$ = this.fetchWeather().pipe(
  shareReplay(1)  // Cache la dernière valeur
);`,
          usage: 'Éviter les requêtes multiples pour le même Observable'
        },
        {
          keyword: 'takeUntil()',
          description: 'Complète l\'Observable quand un autre Observable émet.',
          example: `private destroy$ = new Subject<void>();

ngOnInit() {
  this.data$.pipe(
    takeUntil(this.destroy$)  // Se désabonne automatiquement
  ).subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}`,
          usage: 'Pattern standard pour éviter les memory leaks'
        }
      ]
    },
    // === HTTP ===
    {
      category: 'HTTP & API',
      items: [
        {
          keyword: 'HttpClient',
          description: 'Service Angular pour effectuer des requêtes HTTP. Retourne des Observables.',
          example: `export class WeatherService {
  private http = inject(HttpClient);
  
  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>('/api/weather', {
      params: { city }
    });
  }
}`,
          usage: 'Toutes les communications avec des API REST'
        },
        {
          keyword: 'HttpInterceptorFn',
          description: 'Fonction qui intercepte toutes les requêtes HTTP pour les modifier ou gérer les erreurs.',
          example: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Modifier la requête
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer token')
  });
  
  return next(authReq).pipe(
    catchError(error => {
      // Gérer les erreurs globalement
      return throwError(() => error);
    })
  );
};`,
          usage: 'Auth tokens, logging, gestion d\'erreurs globale'
        },
        {
          keyword: 'provideHttpClient()',
          description: 'Fonction de configuration pour activer HttpClient dans l\'application.',
          example: `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    )
  ]
};`,
          usage: 'Configuration obligatoire pour utiliser HttpClient'
        }
      ]
    },
    // === FORMS ===
    {
      category: 'Reactive Forms',
      items: [
        {
          keyword: 'FormControl',
          description: 'Représente un champ de formulaire unique avec sa valeur et sa validation.',
          example: `// Création
searchControl = new FormControl('', [
  Validators.required,
  Validators.minLength(2)
]);

// Lecture de la valeur
const value = this.searchControl.value;

// Modification
this.searchControl.setValue('Paris');

// Écouter les changements
this.searchControl.valueChanges.subscribe(value => { });`,
          usage: 'Champs de formulaire réactifs'
        },
        {
          keyword: 'valueChanges',
          description: 'Observable qui émet à chaque changement de valeur d\'un FormControl.',
          example: `this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter(value => value.length >= 2)
).subscribe(searchTerm => {
  this.search(searchTerm);
});`,
          usage: 'Réagir aux saisies utilisateur en temps réel'
        },
        {
          keyword: 'ReactiveFormsModule',
          description: 'Module Angular qui fournit les directives pour les formulaires réactifs.',
          example: `@Component({
  standalone: true,
  imports: [ReactiveFormsModule]  // Nécessaire pour [formControl]
})`,
          usage: 'Import obligatoire pour utiliser formControl'
        }
      ]
    },
    // === TYPESCRIPT ===
    {
      category: 'TypeScript',
      items: [
        {
          keyword: 'interface',
          description: 'Définit la structure d\'un objet. Utilisé pour le typage strict.',
          example: `interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
}

// Utilisation
const weather: WeatherData = {
  city: 'Paris',
  temperature: 22,
  humidity: 65
};`,
          usage: 'Typage des données, autocomplétion IDE, détection d\'erreurs'
        },
        {
          keyword: 'type',
          description: 'Alias de type. Peut définir des unions, intersections, ou types complexes.',
          example: `// Union type - une valeur parmi plusieurs
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Type conditionnel
type ApiResponse<T> = {
  data: T;
  status: number;
};`,
          usage: 'Types plus flexibles que les interfaces'
        },
        {
          keyword: 'readonly',
          description: 'Modificateur qui empêche la réassignation d\'une propriété.',
          example: `class WeatherService {
  private readonly API_KEY = 'abc123';  // Ne peut pas être modifié
  readonly weatherData$ = this.subject.asObservable();
}`,
          usage: 'Immutabilité, constantes de classe'
        },
        {
          keyword: 'private / public / protected',
          description: 'Modificateurs d\'accès pour contrôler la visibilité des membres.',
          example: `class WeatherService {
  private apiKey = 'secret';        // Accessible uniquement dans cette classe
  protected cache = new Map();      // Accessible dans cette classe et ses enfants
  public weatherData$ = this.data;  // Accessible partout (par défaut)
}`,
          usage: 'Encapsulation et protection des données'
        },
        {
          keyword: 'Generic <T>',
          description: 'Paramètre de type qui rend le code réutilisable avec différents types.',
          example: `// Fonction générique
function first<T>(array: T[]): T | undefined {
  return array[0];
}

first<string>(['a', 'b']);  // Retourne 'a' (type string)
first<number>([1, 2, 3]);   // Retourne 1 (type number)

// Observable générique
Observable<WeatherData>  // Observable qui émet des WeatherData`,
          usage: 'Code réutilisable avec type-safety'
        }
      ]
    },
    // === CONFIGURATION ===
    {
      category: 'Configuration Angular',
      items: [
        {
          keyword: 'ApplicationConfig',
          description: 'Interface pour configurer l\'application Angular (remplace NgModule).',
          example: `export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};`,
          usage: 'Point d\'entrée de configuration pour les apps standalone'
        },
        {
          keyword: 'LOCALE_ID',
          description: 'Token d\'injection pour définir la locale de l\'application.',
          example: `import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

// Dans providers
{ provide: LOCALE_ID, useValue: 'fr-FR' }`,
          usage: 'Formatage des dates, nombres, devises en français'
        },
        {
          keyword: 'environment',
          description: 'Fichiers de configuration pour différents environnements (dev, prod).',
          example: `// environments/environment.ts (dev)
export const environment = {
  production: false,
  apiKey: 'dev-key'
};

// environments/environment.prod.ts (prod)
export const environment = {
  production: true,
  apiKey: 'prod-key'
};`,
          usage: 'Séparer les configurations dev/prod'
        },
        {
          keyword: 'localStorage',
          description: 'API Web pour stocker des données persistantes dans le navigateur.',
          example: `// Sauvegarder
localStorage.setItem('favorites', JSON.stringify(['Paris', 'London']));

// Récupérer
const data = localStorage.getItem('favorites');
const favorites = data ? JSON.parse(data) : [];

// Supprimer
localStorage.removeItem('favorites');`,
          usage: 'Persistance de données côté client (5-10 MB)'
        }
      ]
    }
  ];
}
