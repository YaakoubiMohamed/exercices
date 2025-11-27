import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-computed-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computed-demo.component.html',
  styleUrl: './computed-demo.component.css'
})
export class ComputedDemoComponent {
  // ========== WITHOUT COMPUTED SIGNALS (Manual) ==========
  manualItems: CartItem[] = [];
  manualSubtotal = 0;
  manualDiscount = 0;
  manualTax = 0;
  manualTotal = 0;
  
  private nextManualId = 1;
  
  addManualItem(): void {
    this.manualItems.push({
      id: this.nextManualId++,
      name: `Produit ${this.manualItems.length + 1}`,
      price: Math.floor(Math.random() * 50) + 10,
      quantity: 1
    });
    // ⚠️ IMPORTANT: Doit recalculer manuellement!
    this.recalculateManual();
  }
  
  removeManualItem(id: number): void {
    this.manualItems = this.manualItems.filter(item => item.id !== id);
    // ⚠️ IMPORTANT: Doit recalculer manuellement!
    this.recalculateManual();
  }
  
  updateManualQuantity(id: number, change: number): void {
    const item = this.manualItems.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
      // ⚠️ IMPORTANT: Doit recalculer manuellement!
      this.recalculateManual();
    }
  }
  
  // ⚠️ Méthode manuelle à appeler à chaque modification
  private recalculateManual(): void {
    // Calcul du sous-total
    this.manualSubtotal = this.manualItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    
    // Calcul de la remise (10%)
    this.manualDiscount = this.manualSubtotal * 0.10;
    
    // Calcul de la taxe (20% après remise)
    this.manualTax = (this.manualSubtotal - this.manualDiscount) * 0.20;
    
    // Calcul du total
    this.manualTotal = this.manualSubtotal - this.manualDiscount + this.manualTax;
  }
  
  // ========== WITH COMPUTED SIGNALS (Automatic) ==========
  items = signal<CartItem[]>([]);
  
  private nextId = 1;
  
  // ✅ Computed: Se recalcule automatiquement quand items() change
  subtotal = computed(() => 
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  
  // ✅ Computed: Se recalcule automatiquement quand subtotal() change
  discount = computed(() => this.subtotal() * 0.10);
  
  // ✅ Computed: Se recalcule automatiquement quand subtotal() et discount() changent
  tax = computed(() => (this.subtotal() - this.discount()) * 0.20);
  
  // ✅ Computed: Se recalcule automatiquement quand subtotal(), discount() et tax() changent
  total = computed(() => this.subtotal() - this.discount() + this.tax());
  
  addItem(): void {
    this.items.update(current => [...current, {
      id: this.nextId++,
      name: `Produit ${current.length + 1}`,
      price: Math.floor(Math.random() * 50) + 10,
      quantity: 1
    }]);
    // ✅ Pas besoin de recalculer! Les computed signals le font automatiquement
  }
  
  removeItem(id: number): void {
    this.items.update(current => current.filter(item => item.id !== id));
    // ✅ Pas besoin de recalculer! Les computed signals le font automatiquement
  }
  
  updateQuantity(id: number, change: number): void {
    this.items.update(current =>
      current.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    // ✅ Pas besoin de recalculer! Les computed signals le font automatiquement
  }
}
