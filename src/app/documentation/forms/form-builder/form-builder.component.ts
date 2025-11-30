import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css'
})
export class FormBuilderComponent {
  private fb = inject(FormBuilder);

  // Simple form with FormBuilder
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  // Nested form groups
  userForm = this.fb.group({
    personalInfo: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['']
    }),
    contactInfo: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]{10}$/)]
    }),
    address: this.fb.group({
      street: [''],
      city: [''],
      zipCode: ['', Validators.pattern(/^[0-9]{5}$/)]
    })
  });

  methods = [
    { name: 'group()', description: 'Crée un FormGroup avec des contrôles' },
    { name: 'control()', description: 'Crée un FormControl individuel' },
    { name: 'array()', description: 'Crée un FormArray pour listes dynamiques' },
    { name: 'nonNullable', description: 'Assure des valeurs non-null' }
  ];

  onSubmit() {
    console.log('Form value:', this.userForm.value);
  }
}
