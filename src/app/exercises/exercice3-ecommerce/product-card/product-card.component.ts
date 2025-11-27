import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<{ product: Product; quantity: number }>();
  
  quantity = signal(1);
  
  onAddClick(): void {
    this.addToCart.emit({
      product: this.product(),
      quantity: this.quantity()
    });
  }
}
