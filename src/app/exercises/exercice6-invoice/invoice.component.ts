import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  // Informations client
  customerName = signal('');
  customerEmail = signal('');
  customerAddress = signal('');

  // Liste des articles (writable signal)
  items = signal<InvoiceItem[]>([]);

  // Taux de TVA (par défaut 19%)
  vatRate = signal(19);

  // Pour le formulaire d'ajout d'article
  newItemName = signal('');
  newItemQuantity = signal(1);
  newItemPrice = signal(0);

  // Compteur pour les IDs uniques
  private nextId = 1;

  // Computed signals pour les calculs

  // Calcul du sous-total (somme de tous les articles)
  subtotal = computed(() => {
    return this.items().reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
  });

  // Calcul du montant de TVA
  vatAmount = computed(() => {
    return this.subtotal() * (this.vatRate() / 100);
  });

  // Calcul du total TTC
  total = computed(() => {
    return this.subtotal() + this.vatAmount();
  });

  // Statistiques supplémentaires
  itemCount = computed(() => this.items().length);
  
  totalQuantity = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  // Ajouter un article
  addItem(): void {
    const name = this.newItemName().trim();
    
    if (!name) {
      alert('Le nom de l\'article est requis');
      return;
    }
    
    if (this.newItemQuantity() <= 0) {
      alert('La quantité doit être supérieure à 0');
      return;
    }
    
    if (this.newItemPrice() < 0) {
      alert('Le prix ne peut pas être négatif');
      return;
    }
    
    const newItem: InvoiceItem = {
      id: this.nextId++,
      name: this.newItemName(),
      quantity: this.newItemQuantity(),
      unitPrice: this.newItemPrice()
    };
    
    // Mise à jour immutable du signal
    this.items.update(current => [...current, newItem]);
    
    // Réinitialiser le formulaire
    this.resetItemForm();
  }

  // Supprimer un article
  removeItem(id: number): void {
    this.items.update(current => current.filter(item => item.id !== id));
  }

  // Réinitialiser le formulaire d'article
  resetItemForm(): void {
    this.newItemName.set('');
    this.newItemQuantity.set(1);
    this.newItemPrice.set(0);
  }

  // Calculer le montant d'une ligne
  getLineTotal(item: InvoiceItem): number {
    return item.quantity * item.unitPrice;
  }
}
