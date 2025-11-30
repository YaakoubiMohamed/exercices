import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskPriority, Task, TaskStats } from './task.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * EXERCICE 2 : Composant de gestion des tâches
 * 
 * Composant utilisant des Observables et le pattern subscribe/unsubscribe
 * - Injection du TaskService
 * - Propriétés pour le formulaire
 * - Gestion du filtre actif
 * - Souscription aux observables du service
 */

type FilterType = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnDestroy {
  protected taskService = inject(TaskService);
  private destroy$ = new Subject<void>();

  // Propriétés pour le formulaire
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority: TaskPriority = 'medium';

  // Filtre actif
  activeFilter: FilterType = 'all';

  // Données affichées
  displayedTasks: Task[] = [];
  stats: TaskStats = { total: 0, completed: 0, pending: 0, completionRate: 0 };

  ngOnInit(): void {
    // Souscription aux statistiques
    this.taskService.stats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => this.stats = stats);

    // Souscription aux tâches selon le filtre
    this.updateDisplayedTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Mise à jour des tâches affichées selon le filtre
  private updateDisplayedTasks(): void {
    const observable = this.getTasksObservable();
    observable
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => this.displayedTasks = tasks);
  }

  // Obtenir l'observable selon le filtre
  private getTasksObservable() {
    switch (this.activeFilter) {
      case 'completed':
        return this.taskService.completedTasks$;
      case 'pending':
        return this.taskService.pendingTasks$;
      default:
        return this.taskService.allTasks$;
    }
  }

  // Ajouter une tâche
  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) {
      alert('Veuillez saisir un titre pour la tâche');
      return;
    }
    
    this.taskService.addTask(
      title,
      this.newTaskDescription,
      this.newTaskPriority
    );
    this.resetForm();
  }

  // Basculer l'état d'une tâche
  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  // Supprimer une tâche
  deleteTask(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.deleteTask(id);
    }
  }

  // Changer le filtre
  setFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.updateDisplayedTasks();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'medium';
  }
}
