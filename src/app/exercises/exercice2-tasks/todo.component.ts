import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskPriority } from './task.service';

/**
 * EXERCICE 2 : Composant de gestion des tâches
 * 
 * TODO:
 * 1. Injecter le TaskService
 * 2. Créer les signals pour le formulaire
 * 3. Créer un signal pour le filtre actif
 * 4. Créer un computed signal pour les tâches affichées
 * 5. Implémenter les méthodes du composant
 */

type FilterType = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  // TODO: Injecter le service
  protected taskService = inject(TaskService);

  // TODO: Créer les signals pour le formulaire
  newTaskTitle = signal('');
  newTaskDescription = signal('');
  newTaskPriority = signal<TaskPriority>('medium');

  // TODO: Créer un signal pour le filtre
  activeFilter = signal<FilterType>('all');

  // Computed signal pour les tâches affichées selon le filtre
  displayedTasks = computed(() => {
    const filter = this.activeFilter();
    switch (filter) {
      case 'completed':
        return this.taskService.completedTasks();
      case 'pending':
        return this.taskService.pendingTasks();
      default:
        return this.taskService.allTasks();
    }
  });

  // Méthode pour ajouter une tâche
  addTask(): void {
    const title = this.newTaskTitle().trim();
    if (!title) {
      alert('Veuillez saisir un titre pour la tâche');
      return;
    }
    
    this.taskService.addTask(
      title,
      this.newTaskDescription(),
      this.newTaskPriority()
    );
    this.resetForm();
  }

  // Méthode pour basculer l'état d'une tâche
  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  // Méthode pour supprimer une tâche
  deleteTask(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.deleteTask(id);
    }
  }

  // Méthode pour changer le filtre
  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.newTaskTitle.set('');
    this.newTaskDescription.set('');
    this.newTaskPriority.set('medium');
  }
}
