import * as path from 'path';
import * as fs from 'fs';

import * as Config from './config';
import * as Types from './types';
import * as Tables from './tables';

export function listTables(tablesPath: string): string[] {
  const files = fs.readdirSync(tablesPath);
  return files.map(fileName => path.join(tablesPath, fileName));
}

export async function loadTablesFromFiles(files: string[]): Promise<void> {
  return files.reduce(async (memo, filePath) => {
    const raw = fs.readFileSync(filePath).toString();
    const tables: { [key: string]: Types.Table } = JSON.parse(raw);

    return Object.entries(tables).reduce(async (memo, [ table_id, table ]) => {
      await memo;
      // console.log(`Loading table ${table_id}`);
      return Tables.set(table_id, table);
    }, memo);
  }, Promise.resolve());
}

export async function doThings() {
  const paths = listTables(Config.tablesPath);
  await loadTablesFromFiles(paths);
  // console.log(paths);
}

doThings();