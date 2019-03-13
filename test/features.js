import test from 'ava';

import * as _Features from '../scripts/features';
import * as Features from '../scripts/generate-features';
import * as Queries from '../scripts/queries';

// const expected = [
//   "26",
//   "2008 olympic gold medal winners",
//   "table-0001-249",
//   "6",
//   "7",
//   "0",
//   "65",
//   "54",
//   "3659",
//   "0.25",
//   "0.00038030043734550294",
//   "0",
//   "0",
//   "13",
//   "-0.19668521988918414",
//   "0.0",
//   "0.2857142857142857",
//   "100",
//   "1.598546991573088e-11",
//   "30.568963762160973",
//   "23.5556061678327",
//   "31.170109829929867",
//   "30.07549105098942",
//   "31.107367016003074",
//   "31.170109829929867",
//   "1.0",
//   "12.6746047422",
//   "0.158432559277",
//   "0.724063231539",
//   "0.878313951697",
//   "46.1380892231",
//   "0.65911556033",
//   "0.847156406132",
//   "0.16269784336399212",
//   "4.60555954177651",
//   "0.027091526716332415",
//   "0.2025233764978797",
//   "0.1458407513661945",
//   "3.5301585340552806",
//   "0.020765638435619297",
//   "0.12610537699222918",
//   "5",
//   "1"
// ];

function objectify(values, keys) {
  return keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key]: values[index]
    };
  }, {});
}

async function doTests() {
  // console.log('Doing tests!');
  //
  // console.log('Waiting for features...');
  const expectedFeatures = (await _Features.getCSVFeatures()).reduce((memo, row) => {
    // console.log('Converting row to features...', row);
    const { query_id, table_id } = row;
    const key = `${query_id}_${table_id}`;

    return {
      ...memo,
      [key]: Features.sortRowValues(row, Features.HEADER)
    };
  }, {});

  // const key = "table-0001-249";
  // const [ qrel ] = Queries.qrels.filter(x => x.document === "table-0001-249");
  // const qrels = [ qrel ];
  const qrels = Queries.qrels;

  // console.log('Reducing qrels');
  qrels.reduce(async (memo, qrel, index) => {
    await memo;
    const key = `${qrel.topic}_${qrel.document}`;
    const expected = expectedFeatures[key];

    return test(`Features - ${JSON.stringify(qrel)}`, async t => {
      const features = await Features.generateFeatures(qrel);
      const values = Features.sortRowValues(features, Features.HEADER);
      return t.deepEqual(objectify(values, Features.HEADER), objectify(expected, Features.HEADER));
    });
  }, Promise.resolve());
}

doTests().catch(console.error.bind(console));

// test('Features - it works', async t => {
//   const features = await Features.generateFeatures(qrel);
//   const values = Features.sortRowValues(features, Features.HEADER);
//   t.deepEqual(objectify(values, Features.HEADER), objectify(expected, Features.HEADER));
// });
