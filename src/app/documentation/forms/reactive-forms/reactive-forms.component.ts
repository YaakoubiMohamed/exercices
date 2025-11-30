import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {
  // Demo form
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.min(18), Validators.max(100)])
  });

  formStates = [
    { property: 'valid', description: 'Le formulaire est valide' },
    { property: 'invalid', description: 'Le formulaire contient des erreurs' },
    { property: 'pristine', description: 'Aucune modification' },
    { property: 'dirty', description: 'Formulaire modifié' },
    { property: 'touched', description: 'Un champ a été touché' },
    { property: 'untouched', description: 'Aucun champ touché' }
  ];

  advantages = [
    'Programmation réactive et immutable',
    'Testabilité supérieure (pas de dépendance au DOM)',
    'Validation synchrone et asynchrone',
    'Gestion d\'état prévisible',
    'Meilleure composition et réutilisabilité'
  ];

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }

  resetForm() {
    this.userForm.reset();
  }
}
