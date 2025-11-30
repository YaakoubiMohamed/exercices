# Exercices Angular 20 - Best Practices

Ce document contient des exercices progressifs pour maîtriser les meilleures pratiques d'Angular 20, incluant les standalone components, reactive forms, dependency injection, et les patterns modernes.

---

##  Exercice 1 : Calculateur de Notes avec Reactive Forms

###  Objectifs pédagogiques
- Utiliser les **Reactive Forms** pour la gestion d'état
- Créer un **standalone component**
- Utiliser les **FormBuilder** et **FormGroup**
- Implémenter la **validation** de formulaire
- Appliquer les bonnes pratiques de typage TypeScript

### 📋 Énoncé
Créez un composant `NotesComponent` qui calcule automatiquement la moyenne d'un étudiant et détermine sa mention en utilisant les Reactive Forms d'Angular 20.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèle de données TypeScript
```typescript
interface StudentGrade {
  studentName: string;
  math: number;
  french: number;
  history: number;
  science: number;
}

type Mention = 'Très Bien' | 'Bien' | 'Assez Bien' | 'Passable' | 'Insuffisant';
```

#### 2. Structure du composant
- Créer un **standalone component** avec `@Component({ standalone: true })`
- Utiliser un **FormGroup** pour les notes et le nom
- Créer des **getters** pour la moyenne
- Créer des **getters** pour la mention
- Importer `ReactiveFormsModule` pour les formulaires réactifs

#### 3. Interface utilisateur
**Formulaire avec :**
- Input pour le nom de l'étudiant (FormControl)
- Input type="number" pour chaque matière (min: 0, max: 20)
- Validation visuelle (bordure rouge si note invalide)

**Affichage dynamique :**
- Nom de l'étudiant en temps réel
- Moyenne avec 2 décimales
- Mention avec couleur conditionnelle :
  - Très Bien: vert foncé
  - Bien: vert clair
  - Assez Bien: bleu
  - Passable: orange
  - Insuffisant: rouge

#### 4. Logique de calcul
```typescript
// Getter pour la moyenne
get average(): number {
  const form = this.notesForm.value;
  const notes = [form.math || 0, form.french || 0, form.history || 0, form.science || 0];
  return notes.reduce((sum, note) => sum + note, 0) / notes.length;
}

// Getter pour la mention
get mention(): string {
  const avg = this.average;
  if (avg >= 16) return 'Très Bien';
  if (avg >= 14) return 'Bien';
  if (avg >= 12) return 'Assez Bien';
  if (avg >= 10) return 'Passable';
  return 'Insuffisant';
}
```

### ✅ Critères de réussite
- [ ] Composant standalone fonctionnel
- [ ] Utilisation de Reactive Forms
- [ ] Calculs automatiques via getters
- [ ] Validation des notes (0-20)
- [ ] Interface réactive et responsive
- [ ] Code typé avec TypeScript strict

---

## 🔀 Exercice 2 : Gestionnaire de Tâches avec Services et RxJS

###  Objectifs pédagogiques
- Créer et injecter un **service** avec `inject()`
- Utiliser **RxJS** et **BehaviorSubject** pour gérer une liste mutable
- Implémenter des **observables** pour les statistiques
- Utiliser `@for` et `@if` (nouveau control flow Angular 20)
- Séparer la logique métier du composant (architecture clean)

### 📋 Énoncé
Développez un gestionnaire de tâches complet avec service dédié, gestion d'état avec RxJS et interface moderne.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèles de données TypeScript
```typescript
interface Task {
  readonly id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
  readonly createdAt: Date;
}

type TaskPriority = 'high' | 'medium' | 'low';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}
```

#### 2. Service TaskService (Injectable)
```typescript
@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  
  // Observable pour toutes les tâches
  readonly allTasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  
  // Observable pour les tâches complétées
  readonly completedTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map(tasks => tasks.filter(t => t.completed))
  );
  
  // Observable pour les tâches en cours
  readonly pendingTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map(tasks => tasks.filter(t => !t.completed))
  );
  
  // Observable pour les statistiques
  readonly stats$: Observable<TaskStats> = this.allTasks$.pipe(
    map(tasks => {
      const completed = tasks.filter(t => t.completed).length;
      return {
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
        completionRate: tasks.length ? (completed / tasks.length) * 100 : 0
      };
    })
  );
  
  // Méthodes CRUD
  addTask(title: string, description: string, priority: TaskPriority): void
  toggleTask(id: number): void
  deleteTask(id: number): void
  updateTask(id: number, updates: Partial<Task>): void
}
```

#### 3. Composant TodoComponent
- Injecter le service avec `private taskService = inject(TaskService)`
- Utiliser les observables du service (pas de duplication d'état)
- Formulaire réactif avec validation
- Filtres : Toutes / En cours / Terminées

#### 4. Interface utilisateur moderne
**Header avec statistiques :**
- Total des tâches
- Tâches terminées
- Barre de progression visuelle (CSS)
- Pourcentage de complétion

**Formulaire d'ajout :**
- Input titre (required, minLength: 3)
- Textarea description (optional)
- Select priorité avec badges colorés
- Bouton "Ajouter" (disabled si formulaire invalide)

**Liste des tâches avec @for :**
```html
@for (task of displayedTasks(); track task.id) {
  <div class="task-card" [class.completed]="task.completed">
    <!-- Contenu de la tâche -->
  </div>
} @empty {
  <p class="empty-state">Aucune tâche pour le moment</p>
}
```

**Carte de tâche :**
- Badge de priorité (couleurs : rouge/orange/vert)
- Titre et description
- Date de création (pipe date)
- Checkbox pour marquer comme terminée
- Bouton de suppression avec confirmation

**Filtres :**
- Boutons radio ou tabs : All / Pending / Completed
- Utilisation d'une propriété pour le filtre actif

#### 5. Styles conditionnels
```css
.task-card {
  border-left: 4px solid;
}

.task-card.priority-high { border-color: #dc3545; }
.task-card.priority-medium { border-color: #fd7e14; }
.task-card.priority-low { border-color: #28a745; }

.task-card.completed {
  opacity: 0.6;
  text-decoration: line-through;
}
```

### ✅ Critères de réussite
- [ ] Service injectable avec RxJS
- [ ] Separation of concerns (service vs component)
- [ ] Observables pour statistiques
- [ ] Nouveau control flow (@for, @if, @empty)
- [ ] Gestion immutable du state
- [ ] Interface responsive
- [ ] Validation du formulaire

---

## 🛒 Exercice 3 : E-Commerce avec Reactive Forms et Architecture Avancée

###  Objectifs pédagogiques
- Utiliser les **Reactive Forms** avec FormBuilder
- Implémenter des **validators personnalisés**
- Créer des **getters et méthodes** pour les calculs
- Architecture multi-services et multi-composants
- Communication parent-child avec **input()** et **output()**
- Utiliser les **pipes** Angular (currency, decimal, date)
- LocalStorage pour la persistance

### 📋 Énoncé
Développez un système e-commerce complet avec catalogue de produits, panier d'achat, gestion de remises et calculs financiers automatiques.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèles de données TypeScript
```typescript
interface Product {
  readonly id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  imageUrl?: string;
}

type ProductCategory = 'electronics' | 'clothing' | 'books' | 'food';

interface CartItem {
  readonly product: Product;
  quantity: number;
}

interface DiscountCode {
  code: string;
  percentage: number;
  minAmount: number;
}

interface CartSummary {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}
```

#### 2. ProductService (données mock)
```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'MacBook Pro',
      price: 2499,
      description: 'Laptop professionnel',
      stock: 5,
      category: 'electronics',
      imageUrl: 'https://via.placeholder.com/150'
    },
    // Ajouter 10+ produits variés
  ]);
  
  readonly allProducts = this.products.asReadonly();
  
  getProductsByCategory(category: ProductCategory): Product[] {
    return this.products().filter(p => p.category === category);
  }
  
  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
  
  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products().filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
}
```

#### 3. CartService (logique métier)
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private appliedDiscountCode = '';
  
  private readonly VALID_CODES: DiscountCode[] = [
    { code: 'WELCOME10', percentage: 10, minAmount: 50 },
    { code: 'SAVE20', percentage: 20, minAmount: 100 },
    { code: 'STUDENT15', percentage: 15, minAmount: 0 }
  ];
  
  readonly items$ = this.cartItemsSubject.asObservable();
  
  // Observables pour calculs financiers
  readonly itemCount$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );
  
  readonly subtotal$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    ))
  );
  
  readonly discount$ = combineLatest([this.subtotal$]).pipe(
    map(([subtotal]) => {
      const code = this.appliedDiscountCode;
      if (!code) return 0;
      
      const coupon = this.VALID_CODES.find(c => c.code === code);
      if (!coupon) return 0;
      
      if (subtotal < coupon.minAmount) return 0;
      
      return (subtotal * coupon.percentage) / 100;
    })
  );
  
  readonly tax$ = combineLatest([this.subtotal$, this.discount$]).pipe(
    map(([subtotal, discount]) => (subtotal - discount) * 0.20)
  );
  
  readonly total$ = combineLatest([this.subtotal$, this.discount$, this.tax$]).pipe(
    map(([subtotal, discount, tax]) => subtotal - discount + tax)
  );
  
  readonly summary$ = combineLatest([
    this.subtotal$, this.discount$, this.tax$, this.total$, this.itemCount$
  ]).pipe(
    map(([subtotal, discount, tax, total, itemCount]) => ({
      subtotal, discount, tax, total, itemCount
    }))
  );
  
  // Méthodes CRUD
  addToCart(product: Product, quantity: number): boolean {
    if (product.stock < quantity) return false;
    
    const currentItems = this.cartItemsSubject.value;
    const existing = currentItems.find(
      item => item.product.id === product.id
    );
    
    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) return false;
      this.updateQuantity(product.id, newQty);
    } else {
      this.cartItemsSubject.next([...currentItems, { product, quantity }]);
    }
    
    this.saveToLocalStorage();
    return true;
  }
  
  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next(
      currentItems.filter(item => item.product.id !== productId)
    );
    this.saveToLocalStorage();
  }
  
  updateQuantity(productId: number, quantity: number): boolean {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(i => i.product.id === productId);
    if (!item || quantity > item.product.stock || quantity < 1) {
      return false;
    }
    
    this.cartItemsSubject.next(
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
    this.saveToLocalStorage();
    return true;
  }
  
  applyDiscount(code: string): boolean {
    const upperCode = code.toUpperCase();
    const coupon = this.VALID_CODES.find(c => c.code === upperCode);
    
    if (!coupon) return false;
    // Note: You would need to get current subtotal value here
    
    this.appliedDiscountCode = upperCode;
    return true;
  }
  
  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.appliedDiscountCode = '';
    this.saveToLocalStorage();
  }
  
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }
  
  loadFromLocalStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItemsSubject.next(JSON.parse(stored));
    }
  }
}
```

#### 4. Composants

**ProductListComponent :**
```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="filters">
      <select (change)="onCategoryChange($event)">
        <option value="">Toutes les catégories</option>
        <option value="electronics">Électronique</option>
        <option value="clothing">Vêtements</option>
        <option value="books">Livres</option>
        <option value="food">Alimentation</option>
      </select>
      
      <input type="search" 
             placeholder="Rechercher..." 
             (input)="onSearch($event)">
    </div>
    
    <div class="product-grid">
      @for (product of filteredProducts; track product.id) {
        <app-product-card 
          [product]="product"
          (addToCart)="onAddToCart($event)" />
      } @empty {
        <p class="empty-state">Aucun produit trouvé</p>
      }
    </div>
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  private selectedCategory: ProductCategory | '' = '';
  private searchQuery = '';
  
  get filteredProducts(): Product[] {
    let products = this.productService.allProducts;
    
    if (this.selectedCategory) {
      products = products.filter(p => p.category === this.selectedCategory);
    }
    
    if (this.searchQuery) {
      const lowerQuery = this.searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    return products;
  }
  
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory = value as ProductCategory | '';
  }
  
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;
  }
  
  onAddToCart(data: { product: Product; quantity: number }): void {
    const success = this.cartService.addToCart(
      data.product,
      data.quantity
    );
    
    if (!success) {
      alert('Stock insuffisant');
    }
  }
}
```

**ProductCardComponent :**
```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="card">
      @if (product().imageUrl) {
        <img [src]="product().imageUrl" [alt]="product().name">
      }
      
      <div class="card-body">
        <h3>{{ product().name }}</h3>
        <p class="description">{{ product().description }}</p>
        <p class="price">{{ product().price | currency:'EUR' }}</p>
        
        @if (product().stock > 0) {
          <div class="add-section">
            <input type="number" 
                   [(ngModel)]="quantity"
                   min="1" 
                   [max]="product().stock">
            <button (click)="onAddClick()">
              Ajouter au panier
            </button>
          </div>
          <small class="stock">Stock: {{ product().stock }}</small>
        } @else {
          <p class="out-of-stock">Rupture de stock</p>
        }
      </div>
    </div>
  `
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<{ product: Product; quantity: number }>();
  
  quantity = 1;
  
  onAddClick(): void {
    this.addToCart.emit({
      product: this.product(),
      quantity: this.quantity
    });
  }
}
```

**CartComponent avec Reactive Forms :**
```typescript
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DecimalPipe],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected cartService = inject(CartService);
  
  promoForm = this.fb.group({
    code: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[A-Z0-9]+$/)
    ]]
  });
  
  promoMessage = '';
  
  ngOnInit(): void {
    this.cartService.loadFromLocalStorage();
  }
  
  updateQuantity(productId: number, quantity: number): void {
    const success = this.cartService.updateQuantity(productId, quantity);
    if (!success) {
      alert('Quantité invalide ou stock insuffisant');
    }
  }
  
  removeItem(productId: number): void {
    if (confirm('Supprimer cet article ?')) {
      this.cartService.removeFromCart(productId);
    }
  }
  
  applyPromoCode(): void {
    if (this.promoForm.invalid) return;
    
    const code = this.promoForm.value.code!.toUpperCase();
    const success = this.cartService.applyDiscount(code);
    
    if (success) {
      this.promoMessage = '✓ Code appliqué avec succès';
      this.promoForm.reset();
    } else {
      this.promoMessage = '✗ Code invalide ou montant minimum non atteint';
      this.promoForm.controls.code.setErrors({ invalidCode: true });
    }
  }
  
  clearCart(): void {
    if (confirm('Vider le panier ?')) {
      this.cartService.clearCart();
    }
  }
}
```

#### 5. Template CartComponent
```html
<div class="cart-container">
  <h2>Panier ({{ cartService.itemCount$ | async }} articles)</h2>
  
  @if ((cartService.items$ | async)?.length === 0) {
    <p class="empty-cart">Votre panier est vide</p>
  } @else {
    <div class="cart-items">
      @for (item of cartService.items$ | async; track item.product.id) {
        <div class="cart-item">
          <img [src]="item.product.imageUrl" [alt]="item.product.name">
          
          <div class="item-details">
            <h4>{{ item.product.name }}</h4>
            <p>{{ item.product.price | currency:'EUR' }}</p>
          </div>
          
          <div class="quantity-control">
            <input type="number"
                   [value]="item.quantity"
                   min="1"
                   [max]="item.product.stock"
                   (change)="updateQuantity(item.product.id, $any($event.target).value)">
          </div>
          
          <div class="item-total">
            {{ item.product.price * item.quantity | currency:'EUR' }}
          </div>
          
          <button class="btn-remove" 
                  (click)="removeItem(item.product.id)">
            ✕
          </button>
        </div>
      }
    </div>
    
    <!-- Formulaire code promo -->
    <div class="promo-section">
      <form [formGroup]="promoForm" (ngSubmit)="applyPromoCode()">
        <input type="text" 
               formControlName="code"
               placeholder="Code promo"
               style="text-transform: uppercase">
        <button type="submit" [disabled]="promoForm.invalid">
          Appliquer
        </button>
      </form>
      
      @if (promoMessage) {
        <p class="promo-message" 
           [class.success]="promoMessage.includes('✓')">
          {{ promoMessage }}
        </p>
      }
      
      @if (promoForm.controls.code.errors?.['pattern']) {
        <small class="error">Le code doit contenir uniquement des lettres majuscules et chiffres</small>
      }
    </div>
    
    <!-- Résumé financier -->
    <div class="cart-summary">
      <h3>Résumé</h3>
      
      <div class="summary-line">
        <span>Sous-total</span>
        <span>{{ cartService.subtotal$ | async | currency:'EUR' }}</span>
      </div>
      
      @if ((cartService.discount$ | async) > 0) {
        <div class="summary-line discount">
          <span>Remise</span>
          <span>-{{ cartService.discount$ | async | currency:'EUR' }}</span>
        </div>
      }
      
      <div class="summary-line">
        <span>TVA (20%)</span>
        <span>{{ cartService.tax$ | async | currency:'EUR' }}</span>
      </div>
      
      <div class="summary-line total">
        <strong>TOTAL</strong>
        <strong>{{ cartService.total$ | async | currency:'EUR' }}</strong>
      </div>
      
      <button class="btn-checkout">Valider la commande</button>
      <button class="btn-clear" (click)="clearCart()">Vider le panier</button>
    </div>
  }
</div>
```

#### 6. Routing
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'products' }
];
```

#### 7. Navigation dans App Component
```html
<nav>
  <a routerLink="/products">Produits</a>
  <a routerLink="/cart">
    Panier ({{ cartService.itemCount$ | async }})
  </a>
</nav>
<router-outlet />
```

### ✅ Critères de réussite
- [ ] Architecture multi-services (ProductService + CartService)
- [ ] Reactive Forms avec validation complète
- [ ] Observables et getters pour tous les calculs financiers
- [ ] Communication parent-child (input/output)
- [ ] Utilisation correcte des pipes (currency, decimal)
- [ ] Gestion du stock (validation avant ajout)
- [ ] Validation des codes promo avec montant minimum
- [ ] Persistance avec LocalStorage
- [ ] Filtrage et recherche de produits
- [ ] Interface responsive et professionnelle
- [ ] Nouveau control flow (@for, @if, @else)
- [ ] Typage strict TypeScript
- [ ] Gestion des erreurs utilisateur

---

## 🌐 Exercice 4 : Application Météo avec HttpClient et RxJS

###  Objectifs pédagogiques
- Utiliser **HttpClient** avec observables
- Maîtriser **RxJS** et les observables
- Gérer les **états de chargement** et les **erreurs**
- Créer des **pipes personnalisés**
- Utiliser les **Interceptors** HTTP
- Implémenter le **debouncing** pour les recherches

### 📋 Énoncé
Créez une application météo qui récupère les données d'une API publique, avec recherche de villes, favoris et affichage des prévisions.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèles de données
```typescript
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

interface ForecastDay {
  date: Date;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface WeatherState {
  data: WeatherData | null;
  status: LoadingState;
  error: string | null;
}
```

#### 2. WeatherService avec RxJS
```typescript
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private readonly API_KEY = 'YOUR_API_KEY';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';
  
  // Subject pour la ville recherchée
  private cityQuerySubject = new BehaviorSubject<string>('Paris');
  
  // Observable pour les données météo
  weatherData$ = this.cityQuerySubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(city => this.fetchWeather(city)),
    catchError(error => {
      console.error('Weather fetch error:', error);
      return of(null);
    })
  );
  
  private fetchWeather(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}/weather`;
    const params = {
      q: city,
      appid: this.API_KEY,
      units: 'metric',
      lang: 'fr'
    };
    
    return this.http.get<any>(url, { params }).pipe(
      map(response => this.transformResponse(response))
    );
  }
  
  searchCity(city: string): void {
    this.cityQuerySubject.next(city);
  }
  
  getForecast(city: string): Observable<ForecastDay[]> {
    const url = `${this.BASE_URL}/forecast`;
    const params = {
      q: city,
      appid: this.API_KEY,
      units: 'metric',
      lang: 'fr'
    };
    
    return this.http.get<any>(url, { params }).pipe(
      map(response => this.transformForecast(response))
    );
  }
  
  private transformResponse(data: any): WeatherData {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date()
    };
  }
  
  private transformForecast(data: any): ForecastDay[] {
    // Transformer les données forecast
    return [];
  }
}
```

#### 3. FavoritesService avec LocalStorage
```typescript
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  
  readonly favoriteCities$ = this.favoritesSubject.asObservable();
  
  constructor() {
    this.loadFavorites();
  }
  
  addFavorite(city: string): void {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.includes(city)) {
      this.favoritesSubject.next([...currentFavorites, city]);
      this.saveFavorites();
    }
  }
  
  removeFavorite(city: string): void {
    const currentFavorites = this.favoritesSubject.value;
    this.favoritesSubject.next(currentFavorites.filter(f => f !== city));
    this.saveFavorites();
  }
  
  isFavorite(city: string): boolean {
    return this.favoritesSubject.value.includes(city);
  }
  
  private saveFavorites(): void {
    localStorage.setItem('weather-favorites', 
      JSON.stringify(this.favoritesSubject.value));
  }
  
  private loadFavorites(): void {
    const stored = localStorage.getItem('weather-favorites');
    if (stored) {
      this.favoritesSubject.next(JSON.parse(stored));
    }
  }
}
```

#### 4. Pipe personnalisé pour la température
```typescript
@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: 'C' | 'F' = 'C'): string {
    if (unit === 'F') {
      value = (value * 9/5) + 32;
    }
    return `${Math.round(value)}°${unit}`;
  }
}
```

#### 5. HTTP Interceptor pour les erreurs
```typescript
export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Request:', req.url);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';
      
      if (error.status === 404) {
        errorMessage = 'Ville non trouvée';
      } else if (error.status === 401) {
        errorMessage = 'Clé API invalide';
      } else if (error.status === 0) {
        errorMessage = 'Erreur de connexion';
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
};

// Dans app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([weatherInterceptor])
    ),
    // ...
  ]
};
```

#### 6. Composant WeatherSearch
```typescript
@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="search-container">
      <input type="search"
             [formControl]="searchControl"
             placeholder="Rechercher une ville..."
             autocomplete="off">
      
      @if (isSearching) {
        <span class="spinner">🔄</span>
      }
    </div>
  `
})
export class WeatherSearchComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  searchControl = new FormControl('');
  isSearching = false;
  
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(query => query !== null && query.length >= 3),
      tap(() => this.isSearching = true),
      finalize(() => this.isSearching = false)
    ).subscribe(city => {
      if (city) {
        this.weatherService.searchCity(city);
      }
    });
  }
}
```

#### 7. Composant WeatherDisplay
```typescript
@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, TemperaturePipe],
  template: `
    @if (weather$ | async; as data) {
      <div class="weather-card">
        <div class="location">
          <h2>{{ data.city }}, {{ data.country }}</h2>
          <button (click)="toggleFavorite(data.city)">
            {{ isFavorite(data.city) ? '⭐' : '☆' }}
          </button>
        </div>
        
        <div class="main-info">
          <img [src]="getWeatherIcon(data.icon)" 
               [alt]="data.description">
          <div class="temperature">
            {{ data.temperature | temperature }}
          </div>
          <p class="description">{{ data.description }}</p>
        </div>
        
        <div class="details">
          <div class="detail">
            <span>Ressenti</span>
            <strong>{{ data.feelsLike | temperature }}</strong>
          </div>
          <div class="detail">
            <span>Humidité</span>
            <strong>{{ data.humidity }}%</strong>
          </div>
          <div class="detail">
            <span>Vent</span>
            <strong>{{ data.windSpeed }} m/s</strong>
          </div>
        </div>
        
        <small class="timestamp">
          Mis à jour: {{ data.timestamp | date:'short':'':'fr' }}
        </small>
      </div>
    } @else {
      <p class="loading">Chargement des données météo...</p>
    }
  `
})
export class WeatherDisplayComponent {
  private weatherService = inject(WeatherService);
  private favoritesService = inject(FavoritesService);
  
  weather$ = this.weatherService.weatherData$;
  
  isFavorite(city: string): boolean {
    return this.favoritesService.isFavorite(city);
  }
  
  toggleFavorite(city: string): void {
    if (this.isFavorite(city)) {
      this.favoritesService.removeFavorite(city);
    } else {
      this.favoritesService.addFavorite(city);
    }
  }
  
  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
```

#### 8. Composant Favorites
```typescript
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favorites-panel">
      <h3>Villes favorites</h3>
      
      @if ((favorites$ | async)?.length === 0) {
        <p class="empty">Aucune ville favorite</p>
      } @else {
        <ul class="favorites-list">
          @for (city of favorites$ | async; track city) {
            <li>
              <button (click)="selectCity(city)">
                {{ city }}
              </button>
              <button class="remove" 
                      (click)="removeFavorite(city)">
                ✕
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `
})
export class FavoritesComponent {
  private weatherService = inject(WeatherService);
  private favoritesService = inject(FavoritesService);
  
  favorites$ = this.favoritesService.favoriteCities$;
  
  selectCity(city: string): void {
    this.weatherService.searchCity(city);
  }
  
  removeFavorite(city: string): void {
    this.favoritesService.removeFavorite(city);
  }
}
```

### ✅ Critères de réussite
- [ ] HttpClient configuré avec provideHttpClient()
- [ ] RxJS operators: debounceTime, switchMap, catchError
- [ ] HTTP Interceptor fonctionnel
- [ ] Pipe personnalisé pour la température
- [ ] Gestion des états de chargement
- [ ] Gestion des erreurs HTTP
- [ ] LocalStorage pour les favoris
- [ ] Interface réactive avec debounce sur la recherche
- [ ] Observables pour les données dérivées
- [ ] API réelle (OpenWeatherMap ou équivalent)

---

## 🔐 Exercice 5 : Authentification et Guards

###  Objectifs pédagogiques
- Implémenter l'**authentification** avec JWT
- Créer des **Route Guards** fonctionnels
- Utiliser les **Interceptors** pour les tokens
- Gérer l'état d'authentification avec RxJS
- Implémenter le **lazy loading** des modules
- Créer des **directives structurelles personnalisées**

### 📋 Énoncé
Développez un système d'authentification complet avec login, logout, protection des routes et gestion des tokens JWT.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèles de données
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

type UserRole = 'admin' | 'user' | 'guest';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

#### 2. AuthService
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });
  
  readonly currentUser$ = this.authStateSubject.pipe(map(state => state.user));
  readonly isAuthenticated$ = this.authStateSubject.pipe(map(state => state.isAuthenticated));
  readonly userRole$ = this.authStateSubject.pipe(map(state => state.user?.role ?? 'guest'));
  
  constructor() {
    this.loadAuthFromStorage();
  }
  
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(response => {
        this.setAuthData(response);
        this.saveAuthToStorage(response);
      })
    );
  }
  
  logout(): void {
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false
    });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }
  
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<AuthResponse>('/api/auth/refresh', { refreshToken });
  }
  
  hasRole(role: UserRole): boolean {
    return this.authStateSubject.value.user?.role === role;
  }
  
  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }
  
  get userRole(): UserRole {
    return this.authStateSubject.value.user?.role ?? 'guest';
  }
  
  private setAuthData(response: AuthResponse): void {
    this.authStateSubject.next({
      user: response.user,
      token: response.token,
      isAuthenticated: true
    });
  }
  
  private saveAuthToStorage(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user_data', JSON.stringify(response.user));
  }
  
  private loadAuthFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      this.authStateSubject.next({
        user: JSON.parse(userData),
        token,
        isAuthenticated: true
      });
    }
  }
}
```

#### 3. Auth Interceptor pour JWT
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.isAuthenticated ? 
    localStorage.getItem('auth_token') : null;
  
  if (token && !req.url.includes('/auth/')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
```

#### 4. Auth Guard fonctionnel
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated) {
    return true;
  }
  
  // Rediriger vers login avec returnUrl
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
```

#### 5. Role Guard
```typescript
export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (!authService.isAuthenticated) {
      return router.createUrlTree(['/login']);
    }
    
    const userRole = authService.userRole;
    if (allowedRoles.includes(userRole)) {
      return true;
    }
    
    return router.createUrlTree(['/forbidden']);
  };
};
```

#### 6. Routes avec Guards
```typescript
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [authGuard, roleGuard(['admin'])]
  },
  
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }
];
```

#### 7. LoginComponent avec Reactive Forms
```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Connexion</h2>
        
        @if (errorMessage) {
          <div class="alert alert-error">
            {{ errorMessage }}
          </div>
        }
        
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" 
                 type="email"
                 formControlName="email"
                 placeholder="votre@email.com">
          
          @if (loginForm.controls.email.invalid && 
                loginForm.controls.email.touched) {
            <small class="error">Email invalide</small>
          }
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input id="password"
                 type="password"
                 formControlName="password"
                 placeholder="••••••••">
          
          @if (loginForm.controls.password.invalid && 
                loginForm.controls.password.touched) {
            <small class="error">Minimum 6 caractères</small>
          }
        </div>
        
        <button type="submit" 
                [disabled]="loginForm.invalid || isLoading">
          @if (isLoading) {
            Connexion en cours...
          } @else {
            Se connecter
          }
        </button>
        
        <p class="register-link">
          Pas de compte ? 
          <a routerLink="/register">S'inscrire</a>
        </p>
      </form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  isLoading = false;
  errorMessage = '';
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  ngOnInit(): void {
    // Si déjà connecté, rediriger
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const credentials = this.loginForm.value as LoginCredentials;
    
    this.authService.login(credentials).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Erreur de connexion';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
```

#### 8. Directive personnalisée hasRole
```typescript
@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  
  @Input() hasRole!: UserRole | UserRole[];
  
  ngOnInit(): void {
    // Subscribe to user role changes
    this.authService.userRole$.subscribe(userRole => {
      const allowedRoles = Array.isArray(this.hasRole) 
        ? this.hasRole 
        : [this.hasRole];
      
      if (allowedRoles.includes(userRole)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
```

#### 9. Utilisation de la directive
```html
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/profile">Profil</a>
  
  <a *hasRole="'admin'" routerLink="/admin">
    Administration
  </a>
  
  <button (click)="logout()">Déconnexion</button>
</nav>
```

### ✅ Critères de réussite
- [ ] AuthService avec BehaviorSubject pour l'état
- [ ] Login/Logout fonctionnels
- [ ] JWT Token storage (localStorage)
- [ ] HTTP Interceptor pour ajouter le token
- [ ] Auth Guard pour protéger les routes
- [ ] Role Guard pour les permissions
- [ ] Gestion des erreurs 401
- [ ] ReturnUrl après login
- [ ] Lazy loading des composants admin
- [ ] Directive structurelle hasRole
- [ ] Reactive Forms avec validation
- [ ] Interface professionnelle

---

##  Exercice 6 : Formulaire de Facture (Mini Défi)

###  Objectifs pédagogiques
- Utiliser les **Reactive Forms** pour gérer un tableau d'éléments dynamiques
- Créer des **getters** pour les calculs en cascade
- Manipuler des **FormArray** (ajout/suppression)
- Implémenter la **validation de formulaire**
- Utiliser les **FormBuilder** et **FormGroup**
- Appliquer les **bonnes pratiques de formulaires réactifs**

### 📋 Énoncé
Créez un composant `InvoiceComponent` qui génère automatiquement une facture avec calcul de TVA et total, en utilisant les Reactive Forms d'Angular 20 pour une réactivité optimale.

### 🔧 Fonctionnalités à implémenter

#### 1. Modèle de données TypeScript
```typescript
interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface Customer {
  name: string;
  email: string;
  address?: string;
}

interface InvoiceCalculations {
  subtotal: number;    // Sous-total HT
  vatAmount: number;   // Montant TVA
  total: number;       // Total TTC
}
```

#### 2. Structure du composant
**FormGroup principal :**
```typescript
// Formulaire principal
invoiceForm = this.fb.group({
  // Informations client
  customerName: ['', Validators.required],
  customerEmail: ['', [Validators.required, Validators.email]],
  customerAddress: [''],
  
  // Taux de TVA (par défaut 19%)
  vatRate: [19, [Validators.required, Validators.min(0), Validators.max(100)]],
  
  // Liste des articles (FormArray)
  items: this.fb.array([])
});

// Formulaire pour ajouter un nouvel article
newItemForm = this.fb.group({
  name: ['', Validators.required],
  quantity: [1, [Validators.required, Validators.min(1)]],
  unitPrice: [0, [Validators.required, Validators.min(0)]]
});
```

**Getters pour les calculs :**
```typescript
// Getter pour accéder au FormArray des articles
get itemsFormArray(): FormArray {
  return this.invoiceForm.get('items') as FormArray;
}

// Calcul du sous-total (somme de tous les articles)
get subtotal(): number {
  return this.itemsFormArray.controls.reduce((sum, control) => {
    const item = control.value;
    return sum + (item.quantity * item.unitPrice);
  }, 0);
}

// Calcul du montant de TVA
get vatAmount(): number {
  const vatRate = this.invoiceForm.get('vatRate')?.value || 0;
  return this.subtotal * (vatRate / 100);
}

// Calcul du total TTC
get total(): number {
  return this.subtotal + this.vatAmount;
}

// Statistiques supplémentaires
get itemCount(): number {
  return this.itemsFormArray.length;
}

get totalQuantity(): number {
  return this.itemsFormArray.controls.reduce((sum, control) => {
    return sum + (control.value.quantity || 0);
  }, 0);
}
```

#### 3. Méthodes du composant
```typescript
// Compteur pour les IDs uniques
private nextId = 1;

// Ajouter un article
addItem(): void {
  if (this.newItemForm.invalid) {
    alert('Veuillez remplir tous les champs correctement');
    return;
  }
  
  const formValue = this.newItemForm.value;
  const newItem = this.fb.group({
    id: [this.nextId++],
    name: [formValue.name, Validators.required],
    quantity: [formValue.quantity, [Validators.required, Validators.min(1)]],
    unitPrice: [formValue.unitPrice, [Validators.required, Validators.min(0)]]
  });
  
  // Ajouter au FormArray
  this.itemsFormArray.push(newItem);
  
  // Réinitialiser le formulaire
  this.newItemForm.reset({
    name: '',
    quantity: 1,
    unitPrice: 0
  });
}

// Supprimer un article
removeItem(index: number): void {
  this.itemsFormArray.removeAt(index);
}

// Calculer le montant d'une ligne
getLineTotal(index: number): number {
  const item = this.itemsFormArray.at(index).value;
  return item.quantity * item.unitPrice;
}

// Obtenir le FormGroup d'un article spécifique
getItemFormGroup(index: number): FormGroup {
  return this.itemsFormArray.at(index) as FormGroup;
}
```

#### 4. Interface utilisateur

**Section 1 : Informations client**
```html
<section class="customer-section">
  <h3>📋 Informations Client</h3>
  
  <div class="form-group">
    <label>Nom du client *</label>
    <input 
      type="text"
      formControlName="customerName"
      placeholder="Nom complet"
      class="input-field">
  </div>
  
  <div class="form-group">
    <label>Email / Téléphone *</label>
    <input 
      type="email"
      formControlName="customerEmail"
      placeholder="contact@exemple.com"
      class="input-field">
  </div>
  
  <div class="form-group">
    <label>Adresse (optionnelle)</label>
    <textarea 
      formControlName="customerAddress"
      placeholder="Adresse complète..."
      rows="2"
      class="input-field"></textarea>
  </div>
</section>
```

**Section 2 : Ajout d'articles**
```html
<section class="items-section">
  <h3>🛒 Articles</h3>
  
  <form [formGroup]="newItemForm" class="add-item-form">
    <input 
      type="text"
      formControlName="name"
      placeholder="Nom de l'article"
      class="input-name">
    
    <input 
      type="number"
      formControlName="quantity"
      min="1"
      placeholder="Qté"
      class="input-quantity">
    
    <input 
      type="number"
      formControlName="unitPrice"
      min="0"
      step="0.01"
      placeholder="Prix unitaire"
      class="input-price">
    
    <button type="button" (click)="addItem()" 
            [disabled]="newItemForm.invalid" 
            class="btn-add">
      ➕ Ajouter
    </button>
  </form>
  
  <!-- Liste des articles -->
  <div class="items-list">
    @for (itemControl of itemsFormArray.controls; track $index) {
      <div class="item-row">
        <div class="item-info">
          <span class="item-name">{{ itemControl.value.name }}</span>
          <span class="item-details">
            {{ itemControl.value.quantity }} × {{ itemControl.value.unitPrice | currency:'EUR':'symbol':'1.2-2':'fr' }}
          </span>
        </div>
        <div class="item-actions">
          <span class="item-total">
            {{ getLineTotal($index) | currency:'EUR':'symbol':'1.2-2':'fr' }}
          </span>
          <button (click)="removeItem($index)" class="btn-remove">
            🗑️
          </button>
        </div>
      </div>
    } @empty {
      <p class="empty-state">Aucun article ajouté</p>
    }
  </div>
</section>
```

**Section 3 : TVA et Calculs**
```html
<section class="calculations-section">
  <h3>💰 Calculs</h3>
  
  <div class="vat-input">
    <label>Taux de TVA (%)</label>
    <input 
      type="number"
      formControlName="vatRate"
      min="0"
      max="100"
      step="0.5"
      class="input-vat">
  </div>
  
  <div class="summary">
    <div class="summary-row">
      <span>Articles :</span>
      <span>{{ itemCount }} article(s)</span>
    </div>
    
    <div class="summary-row">
      <span>Quantité totale :</span>
      <span>{{ totalQuantity }}</span>
    </div>
    
    <div class="summary-row subtotal">
      <span>Sous-total HT :</span>
      <span>{{ subtotal | currency:'EUR':'symbol':'1.2-2':'fr' }}</span>
    </div>
    
    <div class="summary-row vat">
      <span>TVA ({{ invoiceForm.get('vatRate')?.value }}%) :</span>
      <span>{{ vatAmount | currency:'EUR':'symbol':'1.2-2':'fr' }}</span>
    </div>
    
    <div class="summary-row total">
      <span>Total TTC :</span>
      <span>{{ total | currency:'EUR':'symbol':'1.2-2':'fr' }}</span>
    </div>
  </div>
</section>
```

#### 5. Styles CSS suggérés
```css
.invoice-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}

.customer-section,
.items-section,
.calculations-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.add-item-form {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr auto;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.input-name,
.input-quantity,
.input-price {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.btn-add {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-add:hover {
  background: #229954;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.item-name {
  font-weight: 600;
  color: #2c3e50;
}

.item-details {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-left: 1rem;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-total {
  font-weight: 700;
  color: #27ae60;
  font-size: 1.1rem;
}

.btn-remove {
  background: #e74c3c;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-remove:hover {
  background: #c0392b;
}

.summary {
  background: #ecf0f1;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 1rem;
}

.summary-row.subtotal {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #bdc3c7;
  font-weight: 600;
}

.summary-row.vat {
  color: #e67e22;
  font-weight: 600;
}

.summary-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 3px solid #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.empty-state {
  text-align: center;
  color: #95a5a6;
  padding: 2rem;
  font-style: italic;
}
```

### ✅ Critères de réussite
- [ ] FormGroup pour les infos client (nom, email, adresse)
- [ ] FormArray pour le tableau d'articles
- [ ] FormControl pour le taux de TVA
- [ ] Getter pour le sous-total
- [ ] Getter pour le montant TVA
- [ ] Getter pour le total TTC
- [ ] Formulaire d'ajout d'article avec validation
- [ ] Fonction addItem() avec FormArray
- [ ] Fonction removeItem() pour supprimer un article
- [ ] Affichage dynamique de tous les articles avec @for
- [ ] Calcul automatique du montant par ligne
- [ ] Mise à jour instantanée des calculs
- [ ] Interface professionnelle et responsive
- [ ] Utilisation du pipe currency pour le formatage
- [ ] Validation de formulaire complète
- [ ] État vide géré avec @empty

### 💡 Points d'attention
1. **FormArray** : Utiliser FormArray pour gérer la liste dynamique d'articles
2. **Validation** : Implémenter la validation sur tous les FormControl
3. **IDs uniques** : Utiliser un compteur pour les IDs des articles
4. **Calculs réactifs** : Les getters se mettent à jour automatiquement
5. **Performance** : Les getters recalculent à chaque détection de changement
6. **UX** : Réinitialiser le formulaire après ajout
7. **Formatage** : Utiliser le pipe `currency` avec locale 'fr'

### 🎓 Concepts Angular 20 illustrés
- ✅ **Reactive Forms** avec FormBuilder
- ✅ **FormArray** pour les listes dynamiques
- ✅ **Getters** pour les calculs dérivés
- ✅ **FormControl binding** avec formControlName
- ✅ **Control flow** avec `@for` et `@empty`
- ✅ **Pipes** pour le formatage (currency)
- ✅ **Validation de formulaire** intégrée
- ✅ **Reactive programming** avec formulaires réactifs

---

##  Progression suggérée

1. **Exercice 1** : Maîtriser les bases des Reactive Forms
2. **Exercice 2** : Comprendre les services et l'injection de dépendances
3. **Exercice 6** : Approfondir la manipulation de tableaux avec FormArray
4. **Exercice 3** : Explorer les formulaires réactifs avancés
5. **Exercice 4** : Intégrer des APIs avec HttpClient
6. **Exercice 5** : Sécuriser l'application avec authentification

Bon courage ! 