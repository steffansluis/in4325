import * as path from 'path';

export const tablesPath = path.join(__dirname, '../tables');

export const csvFilePath = path.join(__dirname, '../data/features.csv');
export const queriesPath = path.join(__dirname, '../data/queries.txt');
export const qrelsPath = path.join(__dirname, '../data/qrels.txt');
// export const traingDataPath = path.join(__dirname, '../result/training-data.json');
// export const modelPath = path.join(__dirname, '../result/model');
// export const splitsPath = path.join(__dirname, '../result/splits');
// export const outputPath = path.join(__dirname, '../result/output.json');
// export const featureImpPath = path.join(__dirname, '../result/features');

export function paths(name: string) {
  return {
    csvFilePath: path.join(__dirname, '../data/features.csv'),
    queriesPath: path.join(__dirname, '../data/queries.txt'),
    qrelsPath: path.join(__dirname, '../data/qrels.txt'),

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