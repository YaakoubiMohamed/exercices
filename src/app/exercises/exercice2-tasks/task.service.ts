import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * EXERCICE 2 : Service de gestion des tâches
 * 
 * Service utilisant RxJS pour la gestion d'état
 * - BehaviorSubject pour les tâches
 * - Observables pour les données dérivées
 * - Méthodes CRUD pour manipuler les tâches
 */

export interface Task {
  readonly id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
  readonly createdAt: Date;
}

export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private nextId = 1;

  // Observable pour toutes les tâches
  readonly allTasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  // Observable pour les tâches complétées
  readonly completedTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map(tasks => tasks.filter(t => t.completed))
  );

  // Observable pour les tâches en cours
  readonly pendingTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map(tasks => tasks.filter(t => !t.completed))
  );

  // Observable pour les statistiques
  readonly stats$: Observable<TaskStats> = this.allTasks$.pipe(
    map(tasks => {
      const completed = tasks.filter(t => t.completed).length;
      
      const total = tasks.length;
      return {
        total,
        completed,
        pending: total - completed,
        completionRate: total > 0 ? (completed / total) * 100 : 0
      };
    })
  );


  // Ajouter une tâche
  addTask(title: string, description: string, priority: TaskPriority): void {
    const newTask: Task = {
      id: this.nextId++,
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date()
    };
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, newTask]); // Met à jour le BehaviorSubject avec la nouvelle liste de tâches
  }

  // Basculer l'état d'une tâche
  toggleTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  // Supprimer une tâche
  deleteTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
  //  currentTasks.filter(task => task.id !== id)
    this.tasksSubject.next(currentTasks.filter(task => task.id !== id));
  }

  // Mettre à jour une tâche
  updateTask(id: number, updates: Partial<Task>): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    this.tasksSubject.next(updatedTasks);
  }
}
