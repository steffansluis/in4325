import * as Queries from './queries';
import * as Types from './types';

export type TermCounts = {
  [key: string]: number
};

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}


export function countTerms(text: string) {
  // const textTerms = text.split(' ');
  return Object.keys(Queries.terms) //.map(term => [ term, new RegExp(term, 'g') ]).reduce((memo, [ term, regex ]) => {
    .reduce((memo, term) => {
    // const hits = (text.match(regex) || []).length;
    const hits = occurrences(text, term, false);
     return {
       ...memo,
       [term as string]: hits
     }
   }, {});
  // const Queries.terms.reduce((memo, term) => {
  //
  // });
  // return textTerms.reduce((memo, term) => {
  //   if (term in Queries.terms) memo[term]++;
  //   return memo;
  // }, initialValues);
}

export function sumTableTermCounts(one: Types.TableTermCounts, two: Types.TableTermCounts): Types.TableTermCounts {
  return Object.keys(one).reduce((memo, countKey) => {
    const counts = one[countKey];
    const otherCounts = two[countKey];

    const sums = Object.entries(counts).reduce((memo, [ key, value ]) => {
      const otherValue = otherCounts[key];
      const result = value + otherValue;
      // console.log(`Summing ${key} values: ${value} + ${otherValue} = ${result}`)
      return {
        ...memo,
        [key]: result
      };
    }, {});

    return {
      ...memo,
      [countKey]: sums
    }
  }, {}) as Types.TableTermCounts;
}