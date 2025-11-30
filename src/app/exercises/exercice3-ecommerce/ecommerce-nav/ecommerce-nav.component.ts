import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-ecommerce-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="ecommerce-nav">
      <h2>🛒 E-Commerce App</h2>
      <div class="nav-links">
        <a routerLink="/exercice3/products" 
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}"
           class="nav-btn">
          🏪 Produits
        </a>
        <a routerLink="/exercice3/cart" 
           routerLinkActive="active"
           class="nav-btn cart-btn">
          🛒 Panier
          @if (cartService.itemCount > 0) {
            <span class="badge">{{ cartService.itemCount }}</span>
          }
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .ecommerce-nav {
      background: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .ecommerce-nav h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    
    .nav-links {
      display: flex;
      gap: 1rem;
    }
    
    .nav-btn {
      padding: 0.75rem 1.5rem;
      background: #ecf0f1;
      color: #2c3e50;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .nav-btn:hover {
      background: #bdc3c7;
    }
    
    .nav-btn.active {
      background: #3498db;
      color: white;
    }
    
    .cart-btn {
      position: relative;
    }
    
    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }
    
    @media (max-width: 768px) {
      .ecommerce-nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      
      .nav-links {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class EcommerceNavComponent {
  protected cartService = inject(CartService);
}
