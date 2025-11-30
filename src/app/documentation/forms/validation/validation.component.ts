import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {
  private fb = inject(FormBuilder);

  // Form with various validators
  registrationForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    confirmPassword: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    website: ['', Validators.pattern(/^https?:\/\/.+/)],
    terms: [false, Validators.requiredTrue]
  });

  builtInValidators = [
    { name: 'required', description: 'Champ obligatoire', example: 'Validators.required' },
    { name: 'requiredTrue', description: 'Doit être true (checkbox)', example: 'Validators.requiredTrue' },
    { name: 'email', description: 'Format email valide', example: 'Validators.email' },
    { name: 'minLength', description: 'Longueur minimale', example: 'Validators.minLength(3)' },
    { name: 'maxLength', description: 'Longueur maximale', example: 'Validators.maxLength(20)' },
    { name: 'min', description: 'Valeur minimale', example: 'Validators.min(18)' },
    { name: 'max', description: 'Valeur maximale', example: 'Validators.max(100)' },
    { name: 'pattern', description: 'Expression régulière', example: 'Validators.pattern(/regex/)' }
  ];

  errorMessages = {
    required: 'Ce champ est obligatoire',
    email: 'Email invalide',
    minlength: 'Trop court',
    maxlength: 'Trop long',
    min: 'Valeur trop petite',
    max: 'Valeur trop grande',
    pattern: 'Format invalide',
    passwordStrength: 'Mot de passe trop faible'
  };

  // Custom validator
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { passwordStrength: true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errorKey = Object.keys(control.errors)[0];
    return this.errorMessages[errorKey as keyof typeof this.errorMessages] || 'Erreur de validation';
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      });
    }
  }
}
