import * as fs from 'fs';

import * as Config from './config';
import * as Types from './types';

const rawResults = fs.readFileSync(Config.outputPath).toString();
const results: Types.Result[] = Object.values(JSON.parse(rawResults));

const rawQueries = fs.readFileSync(Config.queriesPath).toString();
const queries = rawQueries.split('\n').slice(0, -1).map(line => {
  const [ _, query_id, query ] = line.split(/^([0-9]*) /)
  return {
    query_id,
    query
  };
});
// console.log(queries.length);

export function processResults(results, queries) {
  const resultsByQueryId = results.reduce((memo, result) => {
    const { query_id } = result.properties;
    return {
      ...memo,
      [query_id]: query_id in memo ? [].concat(memo[query_id], result) : [ result ]
    };
  }, {});

  const queryResults = queries.map(({ query_id, query }) => {
    const sorted = resultsByQueryId[query_id].sort((a, b) => b.score - a.score).slice(0, 20);
    return {
      query,
      query_id,
      results: sorted
    }
  });

  return queryResults.map(queryResultToString).join('\n');
}

export function queryResultToString(queryResult) {
  const { query, query_id, results } = queryResult;
  return results.map((result, index) => {
    return `${query_id}\tQ0\t${result.properties.table_id}\t${index + 1}\t${result.score}\tsmarttable`;
  }).join('\n');
}

console.log(processResults(results, queries));
//
// console.log(JSON.stringify(processResults(results)));
