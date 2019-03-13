import * as path from 'path';
import * as fs from 'fs';

import * as Config from './config';
import * as Types from './types';
import * as Tables from './tables';
import * as Utils from './utils';
import * as Queries from './queries';

export function listTables(tablesPath: string): string[] {
  const files = fs.readdirSync(tablesPath);
  return files.map(fileName => path.join(tablesPath, fileName));
}

export function computeTermCounts(memo: Types.TableTermCounts, table: Types.Table): Types.TableTermCounts {
  const counts = Types.Table.termCounts(table);
  return Utils.sumTableTermCounts(memo, counts);
}

export async function loadTablesFromFiles(files: string[]): Promise<void> {
  console.log(`Loading tables...`);
  const initialValues = Object.keys(Queries.terms).reduce((memo, term) => ({ ...memo, [term]: 0 }), {});
  let termCounts = {
    pageTitle: initialValues,
    sectionTitle: initialValues,
    tableCaption: initialValues,
    tableHeading: initialValues,
    tableBody: initialValues,
    catchAll: initialValues,
  };
  // console.log('Initial values:', Utils.sumTableTermCounts(termCounts, termCounts));
  await files.reduce(async (memo, filePath) => {
    await memo;
    const now = Date.now();
    console.log(`Reading tables from ${filePath}`);
    const raw = fs.readFileSync(filePath).toString();
    const tables: { [key: string]: Types.Table } = JSON.parse(raw);

    await Object.entries(tables).reduce(async (memo, [ table_id, table ]) => {
      await memo;
      // console.log(`Loading table ${table_id}`);
      termCounts = computeTermCounts(termCounts, table);
      // const counts = ;

      // return Tables.set(table_id, table);
    }, memo);

    console.log(`Writing counts for ${filePath} after ${(Date.now() - now) / 1000} seconds`);
    fs.writeFileSync(Config.termCountsPath, Buffer.from(JSON.stringify(termCounts)));

  }, Promise.resolve());


  return;
}

export async function doThings() {
  const paths = listTables(Config.tablesPath);
  console.log(`Loading tables:`, paths);
  await loadTablesFromFiles(paths);
  // console.log(paths);
}

doThings().then(() => process.exit(0));