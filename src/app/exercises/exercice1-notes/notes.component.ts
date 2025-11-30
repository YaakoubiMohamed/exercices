import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * EXERCICE 1 : Calculateur de Notes avec Reactive Forms
 * 
 * Objectif : Implémenter un calculateur de notes utilisant les Reactive Forms Angular 20
 * 
 * TODO:
 * 1. Créer un FormGroup pour les notes (math, french, history, science)
 * 2. Ajouter un FormControl pour le nom de l'étudiant
 * 3. Implémenter un getter pour la moyenne
 * 4. Implémenter un getter pour la mention
 * 5. Ajouter la validation (notes entre 0 et 20)
 * 6. Styliser l'interface
 */

interface StudentGrade {
  studentName: string;
  math: number;
  french: number;
  history: number;
  science: number;
}

type Mention = 'Très Bien' | 'Bien' | 'Assez Bien' | 'Passable' | 'Insuffisant';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  private fb = FormBuilder;

  // FormGroup pour les données de l'étudiant
  notesForm = new FormBuilder().group({
    studentName: ['', Validators.required],
    math: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    french: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    history: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    science: [0, [Validators.required, Validators.min(0), Validators.max(20)]]
  });

  // Propriété pour contrôler l'affichage des résultats
  showResults = false;

  // Nombre total de matières
  readonly totalSubjects = 4;

  // Getter pour la moyenne
  get average(): number {
    const form = this.notesForm.value;
    const notes = [form.math || 0, form.french || 0, form.history || 0, form.science || 0];
    const sum = notes.reduce((acc, note) => acc + note, 0);
    return sum / this.totalSubjects;
  }

  // Getter pour la mention
  get mention(): Mention {
    const avg = this.average;
    if (avg >= 16) return 'Très Bien';
    if (avg >= 14) return 'Bien';
    if (avg >= 12) return 'Assez Bien';
    if (avg >= 10) return 'Passable';
    return 'Insuffisant';
  }

  // Méthode pour obtenir la classe CSS de la mention
  getMentionClass(): string {
    const mention = this.mention;
    switch (mention) {
      case 'Très Bien': return 'mention-tres-bien';
      case 'Bien': return 'mention-bien';
      case 'Assez Bien': return 'mention-assez-bien';
      case 'Passable': return 'mention-passable';
      case 'Insuffisant': return 'mention-insuffisant';
      default: return '';
    }
  }

  // Méthode pour calculer et afficher les résultats
  calculateResults(): void {
    if (this.notesForm.valid) {
      this.showResults = true;
    }
  }
}
