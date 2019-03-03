/** csv file
a,b,c
1,2,3
4,5,6
*/
import * as path from 'path';
import csv from 'csvtojson';
// const csv= require('csvtojson')

const csvFilePath = path.join(__dirname, '../data/features.csv');
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
// })

export type Row = {
  query_id: string, // metadata
  query: string, // metadata
  table_id: string, // metadata
  row: string, // tableFeatures
  col: string, // tableFeatures
  nul: string, // tableFeatures
  in_link: string, // tableFeatures
  out_link: string, // tableFeatures
  pgcount: string, // tableFeatures
  tImp: string, // tableFeatures
  tPF: string, // tableFeatures
  leftColhits: string, // queryTableFeatures
  SecColhits: string, // queryTableFeatures
  bodyhits: string, // queryTableFeatures
  PMI: string, // tableFeatures
  qInPgTitle: string, // queryTableFeatures
  qInTableTitle: string, // queryTableFeatures
  yRank: string, // queryTableFeatures
  csr_score: string, // queryTableFeatures
  idf1: string, // queryFeatures
  idf2: string, // queryFeatures
  idf3: string, // queryFeatures
  idf4: string, // queryFeatures
  idf5: string, // queryFeatures
  idf6: string, // queryFeatures
  max: string, // bagOfEntitiesFeatures
  sum: string, // bagOfEntitiesFeatures
  avg: string, // bagOfEntitiesFeatures
  sim: string, // bagOfEntitiesFeatures
  emax: string, // wordEmbeddingsFeatures
  esum: string, // wordEmbeddingsFeatures
  eavg: string, // wordEmbeddingsFeatures
  esim: string, // wordEmbeddingsFeatures
  cmax: string, // bagOfCategoriesFeatures
  csum: string, // bagOfCategoriesFeatures
  cavg: string, // bagOfCategoriesFeatures
  csim: string, // bagOfCategoriesFeatures
  remax: string, // graphEmbeddingsFeatures
  resum: string, // graphEmbeddingsFeatures
  reavg: string, // graphEmbeddingsFeatures
  resim: string, // graphEmbeddingsFeatures
  query_l: string, // queryFeatures
  rel: string, // target
};

export type IRI = string;
export type Classification = string; // Either relevant or non-relevant: "0" or "1"
export type Metadata = any;
export type Feature = string | number;
export type MLInstance = {
  properties: {
    [key: string]: Metadata
  },
  target: Classification,
  features: {
    [key: string]: Feature
  }
};

export type Features = { [key: string]: boolean };
const queryFeatures: Features = {
  query_l: true,
  idf1: true,
  idf2: true,
  idf3: true,
  idf4: true,
  idf5: true,
  idf6: true,
};

const tableFeatures: Features = {
  row: true,
  col: true,
  nul: true,
  in_link: true,
  out_link: true,
  PMI: true,
  pgcount: true,
  tImp: true,
  tPF: true,
};

const queryTableFeatures: Features = {
  leftColhits: true,
  SecColhits: true,
  bodyhits: true,
  qInPgTitle: true,
  qInTableTitle: true,
  yRank: true,
  csr_score: true,
};

const lexicalFeatures: Features = {
  ...queryFeatures,
  ...tableFeatures,
  ...queryTableFeatures,
};

const bagOfEntitiesFeatures: Features = {
  max: true,
  sum: true,
  avg: true,
  sim: true,
};

const bagOfCategoriesFeatures: Features = {
  cmax: true,
  csum: true,
  cavg: true,
  csim: true,
};

const wordEmbeddingsFeatures: Features = {
  ecmax: true,
  ecsum: true,
  ecavg: true,
  ecsim: true,
};

const graphEmbeddingsFeatures: Features = {
  recmax: true,
  recsum: true,
  recavg: true,
  recsim: true,
};

const semanticFeatures: Features = {
  ...bagOfEntitiesFeatures,
  ...bagOfCategoriesFeatures,
  ...wordEmbeddingsFeatures,
  ...graphEmbeddingsFeatures,
};

const allFeatures: Features = {
  ...lexicalFeatures,
  ...semanticFeatures,
};

export function extractFeatures(row: Row, features: Features): { [key: string]: Feature } {
  return Object.keys(features).reduce((memo, key) => {
    if (!features[key]) return memo;
    return {
      ...memo,
      [key]: row[key]
    };
  }, {});
}

// Async / await usage
async function generateTrainingSet(featuresEnabled: Features = allFeatures): Promise<{ [key: string]: MLInstance }> {
  const jsonArray: Array<Row> = await csv().fromFile(csvFilePath);
  const data = jsonArray.map(row => {
    const { query, query_id, table_id, rel } = row;

    const features = extractFeatures(row, featuresEnabled);

    return {
      properties: {
        query_id,
        query,
        table_id,
      },
      target: rel,
      features
    };
  }).reduce((memo, instance, index) => {
    return {
      ...memo,
      [index]: instance
    }
  }, {});

  return data;
}

export async function doThings() {
  const data = await generateTrainingSet();
  console.log(JSON.stringify(data));
}

doThings();