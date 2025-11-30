import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private appliedDiscountCodeSubject = new BehaviorSubject<string>('');
  
  private readonly VALID_CODES: DiscountCode[] = [
    { code: 'WELCOME10', percentage: 10, minAmount: 50 },
    { code: 'SAVE20', percentage: 20, minAmount: 100 },
    { code: 'STUDENT15', percentage: 15, minAmount: 0 }
  ];
  
  readonly items$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  
  get items(): CartItem[] {
    return this.cartItemsSubject.value;
  }
  
  readonly itemCount$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );
  
  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  readonly subtotal$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
  );
  
  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
  
  get discount(): number {
    const code = this.appliedDiscountCodeSubject.value;
    if (!code) return 0;
    
    const coupon = this.VALID_CODES.find(c => c.code === code);
    if (!coupon) return 0;
    
    const subtotal = this.subtotal;
    if (subtotal < coupon.minAmount) return 0;
    
    return (subtotal * coupon.percentage) / 100;
  }
  
  get tax(): number {
    return (this.subtotal - this.discount) * 0.20;
  }
  
  get total(): number {
    return this.subtotal - this.discount + this.tax;
  }
  
  get summary(): CartSummary {
    return {
      subtotal: this.subtotal,
      discount: this.discount,
      tax: this.tax,
      total: this.total,
      itemCount: this.itemCount
    };
  }
  
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
    
    const updatedItems = currentItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    this.cartItemsSubject.next(updatedItems);
    this.saveToLocalStorage();
    return true;
  }
  
  applyDiscount(code: string): boolean {
    const upperCode = code.toUpperCase();
    const coupon = this.VALID_CODES.find(c => c.code === upperCode);
    
    if (!coupon) return false;
    if (this.subtotal < coupon.minAmount) return false;
    
    this.appliedDiscountCodeSubject.next(upperCode);
    return true;
  }
  
  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.appliedDiscountCodeSubject.next('');
    this.saveToLocalStorage();
  }
  
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }
  
  loadFromLocalStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        this.cartItemsSubject.next(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }
  
  getValidCodes(): DiscountCode[] {
    return this.VALID_CODES;
  }
}
