# 🧭 Task Tracker CLI

A simple **command-line task manager** built with **TypeScript** and **Node.js**.  
You can **add, update, delete, list, and mark tasks** directly from your terminal — all stored in a local `db.json` file.

[Project URL](https://roadmap.sh/projects/task-tracker)

---

## 🚀 Features

- 📋 Add, update, delete, and list tasks
- ✅ Mark tasks as `done` or `in-progress`
- 🔎 Filter tasks by status (`todo`, `done`, `in-progress`)
- 💾 Data stored locally in a simple JSON database
- 🧱 Built with clean, modular TypeScript classes

---

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/task-cli.git
   cd task-cli
   ```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Link it globally to use as a command:

```bash
npm link
```

## 🏃‍♂️ Usage

Run the CLI with npm start or (if linked) just task-cli.

## Add a new task

```bash
npm start add "Buy groceries"
# or
task-cli add "Buy groceries"
```

## List all tasks

```bash
task-cli list
```

## List tasks by status

```bash
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Update a task

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

## Delete a task

```bash
task-cli delete 1
```

## Mark a task as done or in progress

```bash
task-cli mark-done 2
task-cli mark-in-progress 3

```

## 🗂️ Project Structure

```graphql
src/
├── file-manager.ts      # Handles reading/writing db.json
├── task-manager.ts      # Core logic for managing tasks
├── index.ts             # CLI entry point (parses commands)
├── types.ts             # Type definitions
db.json                  # Local data storage (auto-created)
```

## 🧠 Architecture

- ### FileManager
  Responsible for reading and writing to `db.json`.
  Ensures the file exists and initializes it with a default schema if missing.
- ### TaskManager
  Handles all business logic:
  - Generating unique task IDs
  - Creating, updating, and deleting tasks
  - Filtering by status
  - Marking tasks as done or in progress
- ### index.ts
  Acts as the CLI entry point.
  Parses commands and delegates them to `TaskManager`.

## ⚙️ Available Commands

| Command                 | Description                          | Example                                      |
| ----------------------- | ------------------------------------ | -------------------------------------------- |
| `add <desc>`            | Add a new task                       | `task-cli add "Clean house"`                 |
| `update <id> <desc>`    | Update a task description            | `task-cli update 2 "Clean house thoroughly"` |
| `delete <id>`           | Delete a task                        | `task-cli delete 2`                          |
| `mark-done <id>`        | Mark a task as done                  | `task-cli mark-done 2`                       |
| `mark-in-progress <id>` | Mark a task as in progress           | `task-cli mark-in-progress 2`                |
| `list [status]`         | List all tasks or filtered by status | `task-cli list done`                         |

## 🧪 Example Session

```bash
$ task-cli add "Finish README"
[task added]: { id: 1, description: "Finish README", status: "todo", createdAt: "..." }

$ task-cli mark-in-progress 1
[task updated]: { id: 1, description: "Finish README", status: "in-progress", updatedAt: "..." }

$ task-cli mark-done 1
[task updated]: { id: 1, description: "Finish README", status: "done", updatedAt: "..." }

$ task-cli list done
[done tasks]: [ { id: 1, description: "Finish README", status: "done" } ]

```

## 🧰 Tech Stack

- Node.js (v18+)
- TypeScript
- fs, path (for local persistence)
- tsx for running TypeScript directly

## 📜 License

MIT License © 2025 Jonathan Atia
