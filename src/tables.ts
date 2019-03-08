import * as Types from './types';

const _TABLES = {

};

export async function get(table_id: string): Promise<Types.Table> {
  // console.log(`Getting table ${table_id}`);
  return _TABLES[table_id];
}

export async function set(table_id: string, table: Types.Table): Promise<void> {
  _TABLES[table_id] = table;
  return null;
}