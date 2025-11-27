import { Injectable, signal, computed } from '@angular/core';

/**
 * EXERCICE 2 : Service de gestion des tâches
 * 
 * TODO:
 * 1. Créer un signal pour stocker les tâches
 * 2. Implémenter les computed signals pour les filtres
 * 3. Implémenter les computed signals pour les statistiques
 * 4. Implémenter les méthodes CRUD
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
  // TODO: Créer le signal pour les tâches
  private tasks = signal<Task[]>([]);
  private nextId = 1;

  // TODO: Exposer en lecture seule
  readonly allTasks = this.tasks.asReadonly();

  // Computed signal pour les tâches complétées
  readonly completedTasks = computed(() => {
    return this.tasks().filter(t => t.completed);
  });

  // Computed signal pour les tâches en cours
  readonly pendingTasks = computed(() => {
    return this.tasks().filter(t => !t.completed);
  });

  // Computed signal pour les statistiques
  readonly stats = computed<TaskStats>(() => {
    const tasks = this.tasks();
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    return {
      total,
      completed,
      pending: total - completed,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  });

  // Implémenter addTask
  addTask(title: string, description: string, priority: TaskPriority): void {
    const newTask: Task = {
      id: this.nextId++,
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  // Implémenter toggleTask
  toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Implémenter deleteTask
  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  // Implémenter updateTask
  updateTask(id: number, updates: Partial<Task>): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }
}
