import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, ProductCategory } from '../product.service';
import { CartService } from '../cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { EcommerceNavComponent } from '../ecommerce-nav/ecommerce-nav.component';
import { Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, EcommerceNavComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  private selectedCategory = signal<ProductCategory | ''>('');
  private searchQuery = signal('');
  
  filteredProducts = computed(() => {
    let products = this.productService.allProducts();
    
    const category = this.selectedCategory();
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    const query = this.searchQuery();
    if (query) {
      const lowerQuery = query.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return products;
  });
  
  productCount = computed(() => this.filteredProducts().length);
  
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value as ProductCategory | '');
  }
  
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
  
  onAddToCart(data: { product: Product; quantity: number }): void {
    const success = this.cartService.addToCart(
      data.product,
      data.quantity
    );
    
    if (!success) {
      alert('⚠️ Stock insuffisant pour cette quantité');
    } else {
      // Animation ou notification de succès
      console.log(`✓ ${data.product.name} ajouté au panier`);
    }
  }
}
