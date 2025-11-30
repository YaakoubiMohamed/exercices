import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css'
})
export class FormArrayComponent {
  private fb = inject(FormBuilder);

  // Form with FormArray for dynamic skills
  profileForm = this.fb.group({
    name: ['', Validators.required],
    skills: this.fb.array([
      this.createSkillFormGroup()
    ]),
    hobbies: this.fb.array([])
  });

  arrayMethods = [
    { name: 'push()', description: 'Ajoute un contrôle à la fin', example: 'this.skills.push(control)' },
    { name: 'insert()', description: 'Insère à un index spécifique', example: 'this.skills.insert(0, control)' },
    { name: 'removeAt()', description: 'Supprime à un index', example: 'this.skills.removeAt(index)' },
    { name: 'clear()', description: 'Supprime tous les contrôles', example: 'this.skills.clear()' },
    { name: 'at()', description: 'Accède à un contrôle par index', example: 'this.skills.at(0)' },
    { name: 'length', description: 'Nombre de contrôles', example: 'this.skills.length' }
  ];

  useCases = [
    'Liste de compétences avec niveaux',
    'Formulaire multi-étapes avec sections dynamiques',
    'Gestion de plusieurs adresses',
    'Ajout/suppression de numéros de téléphone',
    'Liste de tâches modifiable',
    'Formulaire de facturation avec lignes d\'articles'
  ];

  createSkillFormGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      yearsOfExperience: [0, [Validators.min(0), Validators.max(50)]]
    });
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  get hobbies(): FormArray {
    return this.profileForm.get('hobbies') as FormArray;
  }

  addSkill() {
    this.skills.push(this.createSkillFormGroup());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addHobby() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
    }
  }
}
