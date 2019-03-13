import redis from 'redis';

import * as Types from './types';
import * as Config from './config';

const client = redis.createClient(Config.REDIS_URL);

export async function get(table_id: string): Promise<Types.Table> {
  // console.log(`Getting table ${table_id}`);
  // return _TABLES[table_id];
  return new Promise<Types.Table>((resolve, reject) => {
    client.get(table_id, (err, res: string) => {
      if (err) return reject(err);
      if (!res) return resolve(null);
      const table = JSON.parse(res);
      return resolve(table);
    });
  });

}

export async function set(table_id: string, table: Types.Table): Promise<void> {
  // _TABLES[table_id] = table;
  return new Promise((resolve, reject) => {
    client.set(table_id, JSON.stringify(table), (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}