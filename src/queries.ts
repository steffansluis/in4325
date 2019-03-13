import * as fs from 'fs';

import * as Config from './config';
import * as Types from './types';

const rawQueries = fs.readFileSync(Config.queriesPath).toString();
export const queries: { [key: string]: string } = rawQueries.split('\n').slice(0, -1).reduce((memo, line) => {
  const [ _, query_id, query ] = line.split(/^([0-9]*) /)
  return {
    ...memo,
    [query_id]: query
  };
}, {});

const rawQRels = fs.readFileSync(Config.qrelsPath).toString();
export const qrels = rawQRels.split('\n').slice(0, -1).map(line => {
  const [ topic, iteration, document, relevancy ] = line.split('\t'); // See also: https://trec.nist.gov/data/qrels_eng/
  return {
    topic,
    iteration,
    document,
    relevancy
  } as Types.QRel;
});

export const terms: { [key: string]: boolean } = Object.values(queries).reduce((memo, query) => {
  const terms = query.split(' ');
  const termsObj = terms.reduce((memo, term) => ({ ...memo, [term]: true }), {});
  return {
    ...memo,
    ...termsObj
  };
}, {});

// export const relevantQueryIdByTableId = qrels.reduce((memo, qrel) => {
//   const { topic, document } = qrel;
//   return {
//     ...memo,
//     [document]: document in memo ? [].concat(memo[document], topic): [ topic ]
//   }
// }, {});