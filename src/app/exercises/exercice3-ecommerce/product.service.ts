import { Injectable, signal } from '@angular/core';

export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'food';

export interface Product {
  readonly id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'MacBook Pro',
      price: 2499,
      description: 'Laptop professionnel 16" M3 Pro',
      stock: 5,
      category: 'electronics',
      imageUrl: 'https://via.placeholder.com/200/3498db/ffffff?text=MacBook+Pro'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 1299,
      description: 'Smartphone haut de gamme',
      stock: 12,
      category: 'electronics',
      imageUrl: 'https://via.placeholder.com/200/3498db/ffffff?text=iPhone+15'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      price: 279,
      description: 'Écouteurs sans fil à réduction de bruit',
      stock: 25,
      category: 'electronics',
      imageUrl: 'https://via.placeholder.com/200/3498db/ffffff?text=AirPods'
    },
    {
      id: 4,
      name: 'Jean Levi\'s 501',
      price: 89,
      description: 'Jean classique coupe droite',
      stock: 30,
      category: 'clothing',
      imageUrl: 'https://via.placeholder.com/200/2ecc71/ffffff?text=Jean'
    },
    {
      id: 5,
      name: 'T-Shirt Nike',
      price: 35,
      description: 'T-shirt sport 100% coton',
      stock: 50,
      category: 'clothing',
      imageUrl: 'https://via.placeholder.com/200/2ecc71/ffffff?text=T-Shirt'
    },
    {
      id: 6,
      name: 'Veste North Face',
      price: 250,
      description: 'Veste imperméable pour la randonnée',
      stock: 8,
      category: 'clothing',
      imageUrl: 'https://via.placeholder.com/200/2ecc71/ffffff?text=Veste'
    },
    {
      id: 7,
      name: 'Clean Code',
      price: 45,
      description: 'Livre sur les bonnes pratiques de programmation',
      stock: 15,
      category: 'books',
      imageUrl: 'https://via.placeholder.com/200/e74c3c/ffffff?text=Clean+Code'
    },
    {
      id: 8,
      name: 'Design Patterns',
      price: 52,
      description: 'Les patterns essentiels en programmation',
      stock: 10,
      category: 'books',
      imageUrl: 'https://via.placeholder.com/200/e74c3c/ffffff?text=Design+Patterns'
    },
    {
      id: 9,
      name: 'TypeScript Handbook',
      price: 38,
      description: 'Guide complet du langage TypeScript',
      stock: 20,
      category: 'books',
      imageUrl: 'https://via.placeholder.com/200/e74c3c/ffffff?text=TypeScript'
    },
    {
      id: 10,
      name: 'Café Premium',
      price: 15,
      description: 'Café en grains arabica 1kg',
      stock: 40,
      category: 'food',
      imageUrl: 'https://via.placeholder.com/200/f39c12/ffffff?text=Cafe'
    },
    {
      id: 11,
      name: 'Chocolat Lindt',
      price: 8,
      description: 'Tablette chocolat noir 70%',
      stock: 60,
      category: 'food',
      imageUrl: 'https://via.placeholder.com/200/f39c12/ffffff?text=Chocolat'
    },
    {
      id: 12,
      name: 'Thé Vert Bio',
      price: 12,
      description: 'Boîte de 50 sachets bio',
      stock: 35,
      category: 'food',
      imageUrl: 'https://via.placeholder.com/200/f39c12/ffffff?text=The'
    }
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
