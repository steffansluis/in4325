import * as path from 'path';

export const csvFilePath = path.join(__dirname, '../data/features.csv');
export const queriesPath = path.join(__dirname, '../data/queries.txt');

export const resultPaths = [
  '../build-5/result/',
  '../build-6/result/',
  '../build-7/result/',
  '../build-8/result/',
  '../build-9/result/',
].map(p => path.join(__dirname, p));

export const summarizedResultsPath = path.join(__dirname, '../result/summarized');

// export const resultPaths = [
//   'result/',
//   'result/',
// ].map(p => path.join(__dirname, p));

// export const traingDataPath = path.join(__dirname, '../result/training-data.json');
// export const modelPath = path.join(__dirname, '../result/model');
// export const splitsPath = path.join(__dirname, '../result/splits');
// export const outputPath = path.join(__dirname, '../result/output.json');
// export const featureImpPath = path.join(__dirname, '../result/features');

export function paths(name: string) {
  return {
    csvFilePath: path.join(__dirname, '../data/features.csv'),
    queriesPath: path.join(__dirname, '../data/queries.txt'),

    traingDataPath: path.join(__dirname, `../result/${name}/training-data.json`),
    configPath: path.join(__dirname, `../result/${name}/nordlys-ml-config.json`),

    modelPath: path.join(__dirname, `../result/${name}/model`),
    splitsPath: path.join(__dirname, `../result/${name}/splits`),
    outputPath: path.join(__dirname, `../result/${name}/output.json`),
    featureImpPath: path.join(__dirname, `../result/${name}/features`),

    runfilePath: path.join(__dirname, `../result/${name}/runfile.txt`),
    evaluationPath: path.join(__dirname, `../result/${name}/eval.txt`),
  };
}