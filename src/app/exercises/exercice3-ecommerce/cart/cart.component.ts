import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { EcommerceNavComponent } from '../ecommerce-nav/ecommerce-nav.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, EcommerceNavComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
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
  
  promoMessage = signal('');
  showPromoHint = signal(false);
  
  ngOnInit(): void {
    this.cartService.loadFromLocalStorage();
  }
  
  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    
    if (isNaN(quantity)) return;
    
    const success = this.cartService.updateQuantity(productId, quantity);
    if (!success) {
      alert('⚠️ Quantité invalide ou stock insuffisant');
      // Réinitialiser la valeur
      const item = this.cartService.items().find(i => i.product.id === productId);
      if (item) {
        input.value = item.quantity.toString();
      }
    }
  }
  
  removeItem(productId: number): void {
    if (confirm('Supprimer cet article du panier ?')) {
      this.cartService.removeFromCart(productId);
    }
  }
  
  applyPromoCode(): void {
    if (this.promoForm.invalid) {
      this.promoMessage.set('❌ Code invalide');
      return;
    }
    
    const code = this.promoForm.value.code!.toUpperCase();
    const success = this.cartService.applyDiscount(code);
    
    if (success) {
      this.promoMessage.set('✅ Code promo appliqué avec succès !');
      this.promoForm.reset();
      setTimeout(() => this.promoMessage.set(''), 3000);
    } else {
      this.promoMessage.set('❌ Code invalide ou montant minimum non atteint');
      this.promoForm.controls.code.setErrors({ invalidCode: true });
    }
  }
  
  clearCart(): void {
    if (confirm('Vider le panier ? Cette action est irréversible.')) {
      this.cartService.clearCart();
    }
  }
  
  togglePromoHint(): void {
    this.showPromoHint.update(value => !value);
  }
}
