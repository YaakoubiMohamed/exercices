import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * EXERCICE 1 : Calculateur de Notes avec Signals
 * 
 * Objectif : Implémenter un calculateur de notes utilisant les signals Angular 20
 * 
 * TODO:
 * 1. Créer des signals pour chaque note (math, french, history, science)
 * 2. Créer un signal pour le nom de l'étudiant
 * 3. Implémenter un computed signal pour la moyenne
 * 4. Implémenter un computed signal pour la mention
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
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  // Signals pour les données de l'étudiant
  studentName = signal('');
  math = signal(0);
  french = signal(0);
  history = signal(0);
  science = signal(0);

  // Signal pour contrôler l'affichage des résultats
  showResults = signal(false);

  // Nombre total de matières
  readonly totalSubjects = 4;

  // Computed signal pour la moyenne
  average = computed(() => {
    const notes = [this.math(), this.french(), this.history(), this.science()];
    const sum = notes.reduce((acc, note) => acc + note, 0);
    return sum / this.totalSubjects;
  });

  // Computed signal pour la mention
  mention = computed((): Mention => {
    const avg = this.average();
    if (avg >= 16) return 'Très Bien';
    if (avg >= 14) return 'Bien';
    if (avg >= 12) return 'Assez Bien';
    if (avg >= 10) return 'Passable';
    return 'Insuffisant';
  });

  // Méthode pour obtenir la classe CSS de la mention
  getMentionClass(): string {
    const mention = this.mention();
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
    this.showResults.set(true);
  }
}
