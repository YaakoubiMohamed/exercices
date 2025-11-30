import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators, FormsModule } from '@angular/forms';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  private fb = new FormBuilder();

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

  // Compteur pour les IDs uniques
  private nextId = 1;

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
}
