export interface ITask {
  id: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IDbJSONSchema {
  tasks: ITask[];
  total: number;
}

export interface IBuildTaskArgs {
  description: string;
  db_file: IDbJSONSchema;
}

export interface IAddTaskArgs {
  db_file: IDbJSONSchema;
  task: ITask;
}

export interface IGetTaskArgs {
  db_file: IDbJSONSchema;
  id: number;
}

export interface IEditTaskArgs extends IAddTaskArgs {
  id: number;
}
