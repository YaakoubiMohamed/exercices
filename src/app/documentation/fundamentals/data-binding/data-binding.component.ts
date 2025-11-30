import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  // Demo properties for live examples
  message = 'Angular Data Binding';
  count = 0;
  isVisible = true;
  inputValue = '';
  selectedColor = '#667eea';
  title = 'My App';
  
  increment() {
    this.count++;
  }
  
  handleClick() {
    alert('Button clicked!');
  }
}
