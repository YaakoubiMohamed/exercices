import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CommunicationPattern {
  name: string;
  direction: string;
  decorator: string;
  description: string;
  example: string;
}

@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './input-output.component.html',
  styleUrl: './input-output.component.css'
})
export class InputOutputComponent {
  // Demo data
  parentMessage = 'Message du parent';
  childResponse = '';

  patterns: CommunicationPattern[] = [
    {
      name: 'Input Property',
      direction: 'Parent → Enfant',
      decorator: '@Input()',
      description: 'Passer des données du parent vers l\'enfant',
      example: '@Input() user: User;'
    },
    {
      name: 'Output Event',
      direction: 'Enfant → Parent',
      decorator: '@Output()',
      description: 'Émettre des événements de l\'enfant vers le parent',
      example: '@Output() userChanged = new EventEmitter<User>();'
    },
    {
      name: 'Two-way Binding',
      direction: 'Parent ↔ Enfant',
      decorator: '@Input() + @Output()',
      description: 'Synchronisation bidirectionnelle avec la convention [()]',
      example: '@Input() value; @Output() valueChange = new EventEmitter();'
    }
  ];

  onChildEvent(message: string) {
    this.childResponse = message;
  }
}
