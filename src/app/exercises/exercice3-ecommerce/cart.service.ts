import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  readonly product: Product;
  quantity: number;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  minAmount: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private appliedDiscountCode = signal<string>('');
  
  private readonly VALID_CODES: DiscountCode[] = [
    { code: 'WELCOME10', percentage: 10, minAmount: 50 },
    { code: 'SAVE20', percentage: 20, minAmount: 100 },
    { code: 'STUDENT15', percentage: 15, minAmount: 0 }
  ];
  
  readonly items = this.cartItems.asReadonly();
  
  // Computed signals pour calculs financiers
  readonly itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  readonly subtotal = computed(() => 
    this.cartItems().reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    )
  );
  
  readonly discount = computed(() => {
    const code = this.appliedDiscountCode();
    if (!code) return 0;
    
    const coupon = this.VALID_CODES.find(c => c.code === code);
    if (!coupon) return 0;
    
    const subtotal = this.subtotal();
    if (subtotal < coupon.minAmount) return 0;
    
    return (subtotal * coupon.percentage) / 100;
  });
  
  readonly tax = computed(() => (this.subtotal() - this.discount()) * 0.20);
  
  readonly total = computed(() => 
    this.subtotal() - this.discount() + this.tax()
  );
  
  readonly summary = computed<CartSummary>(() => ({
    subtotal: this.subtotal(),
    discount: this.discount(),
    tax: this.tax(),
    total: this.total(),
    itemCount: this.itemCount()
  }));
  
  // Méthodes CRUD
  addToCart(product: Product, quantity: number): boolean {
    if (product.stock < quantity) return false;
    
    const existing = this.cartItems().find(
      item => item.product.id === product.id
    );
    
    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) return false;
      this.updateQuantity(product.id, newQty);
    } else {
      this.cartItems.update(items => [...items, { product, quantity }]);
    }
    
    this.saveToLocalStorage();
    return true;
  }
  
  removeFromCart(productId: number): void {
    this.cartItems.update(items => 
      items.filter(item => item.product.id !== productId)
    );
    this.saveToLocalStorage();
  }
  
  updateQuantity(productId: number, quantity: number): boolean {
    const item = this.cartItems().find(i => i.product.id === productId);
    if (!item || quantity > item.product.stock || quantity < 1) {
      return false;
    }
    
    this.cartItems.update(items =>
      items.map(item =>
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
    if (this.subtotal() < coupon.minAmount) return false;
    
    this.appliedDiscountCode.set(upperCode);
    return true;
  }
  
  clearCart(): void {
    this.cartItems.set([]);
    this.appliedDiscountCode.set('');
    this.saveToLocalStorage();
  }
  
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
  
  loadFromLocalStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        this.cartItems.set(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }
  
  getValidCodes(): DiscountCode[] {
    return this.VALID_CODES;
  }
}
