import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-what-is-angular',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './what-is-angular.component.html',
  styleUrl: './what-is-angular.component.css'
})
export class WhatIsAngularComponent {
  coreFeatures = [
    {
      title: 'Component-Based Architecture',
      description: 'Angular applications are built using components that encapsulate behavior and UI.',
      icon: '🧩'
    },
    {
      title: 'TypeScript',
      description: 'Angular is built with TypeScript, providing strong typing and modern JavaScript features.',
      icon: '💎'
    },
    {
      title: 'Dependency Injection',
      description: 'Built-in DI system for managing dependencies and promoting testability.',
      icon: '🔧'
    },
    {
      title: 'Reactive Forms',
      description: 'Powerful forms system with validation and dynamic form building capabilities.',
      icon: '📝'
    },
    {
      title: 'RxJS Integration',
      description: 'Reactive programming with observables for handling asynchronous operations.',
      icon: '🌊'
    },
    {
      title: 'Angular CLI',
      description: 'Command-line interface for scaffolding, building, and deploying applications.',
      icon: '⚡'
    }
  ];
}
