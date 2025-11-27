# Guide de Démarrage - Exercices Angular 20

##  Vue d'ensemble

Ce projet contient des exercices progressifs pour maîtriser Angular 20 et ses meilleures pratiques.

## 📁 Structure du projet

```
src/app/
├── home/                          # Page d'accueil avec navigation
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.css
├── exercises/
│   ├── exercice1-notes/          # Exercice 1: Calculateur de Notes
│   │   ├── notes.component.ts
│   │   ├── notes.component.html
│   │   └── notes.component.css
│   └── exercice2-tasks/          # Exercice 2: Gestionnaire de Tâches
│       ├── task.service.ts
│       ├── todo.component.ts
│       ├── todo.component.html
│       └── todo.component.css
├── app.ts                         # Composant racine
├── app.html
├── app.css
└── app.routes.ts                  # Configuration du routing
```

##  Démarrage

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
ng serve
```

### 3. Ouvrir dans le navigateur
Naviguez vers `http://localhost:4200/`

## 📚 Exercices disponibles

### Exercice 1: Calculateur de Notes ⭐ Débutant
**Route:** `/exercice1`

**Concepts couverts:**
- ✅ Signals (`signal()`)
- ✅ Computed signals (`computed()`)
- ✅ Two-way binding (`[(ngModel)]`)
- ✅ FormsModule
- ✅ Standalone components

**Fichiers fournis:**
- Template de base avec structure HTML
- Styles CSS complets
- TODO commentés pour guider l'implémentation

**Ce que vous allez construire:**
Un calculateur qui calcule automatiquement la moyenne de 4 matières et affiche la mention correspondante.

### Exercice 2: Gestionnaire de Tâches ⭐⭐ Intermédiaire
**Route:** `/exercice2`

**Concepts couverts:**
- ✅ Services injectables (`@Injectable`)
- ✅ Dependency injection avec `inject()`
- ✅ Nouveau control flow (`@for`, `@if`, `@empty`)
- ✅ Gestion d'état avec signals
- ✅ Computed signals pour statistiques
- ✅ Architecture clean (séparation service/composant)

**Fichiers fournis:**
- Service TaskService avec structure complète
- Composant TodoComponent avec template
- Interface utilisateur moderne
- Styles CSS complets

**Ce que vous allez construire:**
Une application de gestion de tâches avec priorités, filtres, statistiques et persistance.

## 📖 Documentation des exercices

Consultez le fichier **[td.md](./td.md)** pour:
- 📋 Énoncés détaillés de chaque exercice
-  Objectifs pédagogiques
- 🔧 Exemples de code
- ✅ Critères de réussite

## 🛠️ Technologies utilisées

- **Angular** 20.3.0
- **TypeScript** 5.9.2
- **RxJS** 7.8.0
- **Zone.js** 0.15.0

##  Commandes utiles

```bash
# Démarrer le serveur de développement
ng serve

# Créer un nouveau composant
ng generate component nom-composant

# Créer un nouveau service
ng generate service nom-service

# Build de production
ng build

# Lancer les tests
ng test
```

## 🎓 Progression recommandée

1. **Commencez par l'Exercice 1** pour maîtriser les signals
2. **Continuez avec l'Exercice 2** pour apprendre les services
3. **Consultez td.md** pour les exercices avancés (3, 4, 5)

## 💡 Conseils

### Pour l'Exercice 1:
- Lisez tous les TODO dans le code
- Commencez par créer les signals simples
- Implémentez ensuite les computed signals
- Testez au fur et à mesure

### Pour l'Exercice 2:
- Commencez par le service (logique métier)
- Implémentez les computed signals pour les filtres
- Puis travaillez sur le composant
- Utilisez le nouveau control flow `@for` et `@if`

## 🐛 Debugging

Si vous rencontrez des erreurs:
1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que tous les imports sont corrects
3. Vérifiez que FormsModule est bien importé quand vous utilisez `[(ngModel)]`
4. Consultez la documentation Angular: https://angular.dev

## 📚 Ressources supplémentaires

- [Documentation Angular officielle](https://angular.dev)
- [Guide des Signals](https://angular.dev/guide/signals)
- [Control Flow Syntax](https://angular.dev/guide/templates/control-flow)
- [Reactive Forms](https://angular.dev/guide/forms/reactive-forms)

## ✅ Validation de votre travail

Vérifiez que votre implémentation:
- ✓ Compile sans erreurs
- ✓ Fonctionne dans le navigateur
- ✓ Respecte les critères du fichier td.md
- ✓ Utilise les concepts Angular 20 (signals, control flow, etc.)
- ✓ Suit les bonnes pratiques TypeScript (typage strict)

##  Exercices suivants (dans td.md)

- **Exercice 3:** E-Commerce avec Reactive Forms
- **Exercice 4:** Application Météo avec HttpClient
- **Exercice 5:** Authentification et Guards

Ces exercices sont documentés dans td.md avec des exemples de code complets!

---

Bon courage! 
