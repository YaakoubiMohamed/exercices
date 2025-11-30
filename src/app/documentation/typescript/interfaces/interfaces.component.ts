import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interfaces',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './interfaces.component.html',
  styleUrl: './interfaces.component.css'
})
export class InterfacesComponent {
  features = [
    { title: 'Structure', description: 'Définit la structure d\'un objet', example: 'interface User { name: string; }' },
    { title: 'Type Safety', description: 'Vérification de type à la compilation', example: 'const user: User = { name: "John" };' },
    { title: 'Autocomplétion', description: 'Autocomplétion dans l\'IDE', example: 'user. // IDE suggests properties' },
    { title: 'Documentation', description: 'Documentation du code', example: '/** Represents a user */\ninterface User {}' },
    { title: 'Contrat', description: 'Contrat entre différentes parties du code', example: 'class Service implements IService {}' }
  ];

  typesVsInterfaces = [
    { feature: 'Extension', aspect: 'Extension', interface: 'extends', type: '& (intersection)' },
    { feature: 'Fusion', aspect: 'Fusion', interface: 'Oui (declaration merging)', type: 'Non' },
    { feature: 'Implémentation', aspect: 'Implémentation', interface: 'implements', type: 'Non' },
    { feature: 'Union types', aspect: 'Union types', interface: 'Non', type: 'Oui (|)' },
    { feature: 'Primitives', aspect: 'Primitives', interface: 'Non', type: 'Oui' }
  ];

  useCases = [
    { title: 'Modèles de données', code: 'interface User { id: number; name: string; }' },
    { title: 'Props de composants', code: '@Input() user!: User;' },
    { title: 'Réponses API', code: 'interface ApiResponse<T> { data: T; status: number; }' },
    { title: 'Configuration', code: 'interface Config { apiUrl: string; timeout: number; }' },
    { title: 'Contrats de services', code: 'interface UserService { getUser(id: number): Observable<User>; }' }
  ];

  bestPractices = [
    'Préférer interfaces pour les objets',
    'Utiliser types pour les unions/intersections',
    'Nommer avec PascalCase',
    'Documenter les propriétés complexes',
    'Exporter depuis des fichiers dédiés (.model.ts)'
  ];
}
