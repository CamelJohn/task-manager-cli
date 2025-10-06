import fs from 'node:fs';
import path from 'node:path';
import type { IDbJSONSchema } from './types.js';

export class FileManager {
  private readonly DB_JSON_PATH = path.join(process.cwd(), 'db.json');
  private readonly DB_JSON_SCHEMA = JSON.stringify(
    {
      tasks: [],
      total: 0,
    },
    null,
    2
  );

  constructor() {
    if (!fs.existsSync(this.DB_JSON_PATH)) {
      fs.writeFileSync(this.DB_JSON_PATH, this.DB_JSON_SCHEMA, { encoding: 'utf8' });
    }
  }

  read(): IDbJSONSchema {
    const file = fs.readFileSync(this.DB_JSON_PATH, { encoding: 'utf8' });

    return JSON.parse(file);
  }

  write(data: IDbJSONSchema): void {
    fs.writeFileSync(this.DB_JSON_PATH, JSON.stringify(data, null, 2));
  }
}
