#!/usr/bin/env node

import { TaskManager } from './task-manager.js';

const task_manager = new TaskManager();

const [command, ...args] = process.argv.slice(2);

const commands: Record<string, (...args: any[]) => void> = {
  list: (filter) => task_manager.list(filter),
  add: (desc) => task_manager.add(desc),
  update: (id, desc) => task_manager.update(Number(id), desc),
  delete: (id) => task_manager.delete(Number(id)),
  'mark-done': (id) => task_manager.mark(Number(id), 'done'),
  'mark-in-progress': (id) => task_manager.mark(Number(id), 'in-progress'),
};

if (command && commands[command]) {
  commands[command](...args);
} else {
  console.warn(`
Usage:
  task-cli add "Task description"
  task-cli update <id> "New description"
  task-cli delete <id>
  task-cli mark-done <id>
  task-cli mark-in-progress <id>
  task-cli list [todo|done|in-progress]
  `);
  process.exit(1);
}
