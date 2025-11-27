import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-demo.component.html',
  styleUrl: './counter-demo.component.css'
})
export class CounterDemoComponent {
  // ========== WITHOUT SIGNALS (Traditional) ==========
  traditionalCounter = 0;
  traditionalDetectionCount = 0;
  traditionalFlash = signal(false);
  
  incrementTraditional(): void {
    this.traditionalCounter++;
    this.traditionalDetectionCount++;
    // Traditional approach: Angular checks entire component tree
    // This triggers change detection for the whole component
    this.flashTraditional();
  }
  
  decrementTraditional(): void {
    this.traditionalCounter--;
    this.traditionalDetectionCount++;
    // Change detection runs for entire component on every event
    this.flashTraditional();
  }
  
  resetTraditional(): void {
    this.traditionalCounter = 0;
    this.traditionalDetectionCount++;
    this.flashTraditional();
  }
  
  private flashTraditional(): void {
    this.traditionalFlash.set(true);
    setTimeout(() => this.traditionalFlash.set(false), 500);
  }
  
  // ========== WITH SIGNALS (Modern) ==========
  signalCounter = signal(0);
  signalDetectionCount = signal(0);
  signalFlash = signal(false);
  
  incrementSignal(): void {
    // Automatically triggers UI update!
    this.signalCounter.update(count => count + 1);
    this.signalDetectionCount.update(c => c + 1);
    this.flashSignal();
  }
  
  decrementSignal(): void {
    // Automatically triggers UI update!
    this.signalCounter.update(count => count - 1);
    this.signalDetectionCount.update(c => c + 1);
    this.flashSignal();
  }
  
  resetSignal(): void {
    this.signalCounter.set(0);
    this.signalDetectionCount.update(c => c + 1);
    this.flashSignal();
  }
  
  private flashSignal(): void {
    this.signalFlash.set(true);
    setTimeout(() => this.signalFlash.set(false), 500);
  }
}
