import csv from 'csvtojson';

import * as Config from './config';
import * as Types from './types';

import * as Features from './features';

export function extractFeatures(row: Types.Row, features: Types.Features): { [key: string]: Types.Feature } {
  return Object.keys(features).reduce((memo, key) => {
    if (!features[key]) return memo;
    return {
      ...memo,
      [key]: row[key]
    };
  }, {});
}

export async function generateTrainingSet(featuresEnabled: Types.Features = Features.allFeatures): Promise<{ [key: string]: Types.MLInstance }> {
  const jsonArray: Array<Types.Row> = await csv().fromFile(Config.csvFilePath);
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

// doThings();