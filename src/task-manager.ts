import { FileManager } from './file-manager.js';
import type { IDbJSONSchema, ITask } from './types.js';

export class TaskManager {
  private readonly allowed_statuses = ['all', 'todo', 'in-progress', 'done'];

  constructor(private readonly file_manager = new FileManager()) {}

  private get_next_id(file: IDbJSONSchema) {
    const task_ids = file.tasks.map((task) => task.id);
    return task_ids.length > 0 ? Math.max(...task_ids) + 1 : 1;
  }

  private build(description: string, id: number): ITask {
    return {
      id,
      description,
      createdAt: new Date().toISOString(),
      status: 'todo',
    };
  }

  private build_updated_task_description(id: number, task: ITask, description: string): ITask {
    return {
      ...task,
      id,
      updatedAt: new Date().toISOString(),
      description,
    };
  }

  private build_updated_task_status(id: number, task: ITask, status: string): ITask {
    return {
      ...task,
      id,
      updatedAt: new Date().toISOString(),
      status,
    };
  }

  add(description: string) {
    if (description.trim() === '') {
      return console.error('description can not be an empty string');
    }

    const file = this.file_manager.read();
    const id = this.get_next_id(file);
    const task = this.build(description, id);

    file.tasks.push(task);
    file.tasks.sort((task1, task2) => task1.id - task2.id);
    file.total += 1;

    console.info('[task added]: ', task);

    this.file_manager.write(file);
  }

  list(status?: string) {
    if (!!status && this.allowed_statuses.every((_status) => _status !== status)) {
      return console.error('unsupported status filter');
    }

    const file = this.file_manager.read();

    if (!status) {
      return console.info('[all tasks]: ', file.tasks);
    } else {
      return console.info(
        `[${status} tasks]: `,
        file.tasks.filter((task) => task.status === status)
      );
    }
  }

  update(id: number, description: string) {
    if (description.trim() === '') {
      return console.error('description can not be an empty string.');
    }

    const file = this.file_manager.read();
    const task = file.tasks.find((_task) => _task.id === id);

    if (!task) {
      return console.error(`task with id: ${id} was not found.`);
    }

    const updated = this.build_updated_task_description(id, task, description);

    console.info('[task updated]: ', updated);

    file.tasks = file.tasks.filter((_task) => _task.id !== id);
    file.tasks.push(updated);
    file.tasks.sort((task1, task2) => task1.id - task2.id);

    this.file_manager.write(file);
  }

  delete(id: number) {
    const file = this.file_manager.read();
    file.tasks = file.tasks.filter((task) => task.id !== id);
    file.total = file.total === 0 ? 0 : file.total - 1;
    console.info('[task deleted]: ', id);
    this.file_manager.write(file);
  }

  mark(id: number, status: string) {
    const allowed_statues = ['done', 'in-progress'];

    if (status && !this.allowed_statuses.includes(status)) {
      return console.error('unsupported status filter');
    }

    const file = this.file_manager.read();
    const task = file.tasks.find((task) => task.id === id);

    if (!task) {
      return console.error(`task with id: ${id} was not found.`);
    }

    const updated = this.build_updated_task_status(id, task, status);
    file.tasks = file.tasks.filter((task) => task.id !== id);
    file.tasks.push(updated);

    file.tasks.sort((task1, task2) => task1.id - task2.id);

    console.info('[task updated]: ', updated);

    this.file_manager.write(file);
  }
}
