import * as path from 'path';

const traingDataPath = path.join(__dirname, '../data/training-data.json');
const modelPath = path.join(__dirname, '../data/model');
const splitsPath = path.join(__dirname, '../data/splits');
const outputPath = path.join(__dirname, '../data/output.tsv');

export type Config = {
  model: "rf" | "gbrt",
  category: "regression" | "classification",
  parameters: {
    alpha: number,
    tree: number,
    depth: number
  } | {
    tree: number,
    maxfeat?: number
  },
  training_set: string,
  test_set?: string,
  model_file: string,
  load_model?: boolean,
  feature_imp_file?: string,
  output_file: string,
  cross_validation?: {
    create_splits: boolean,
    splits_file: string,
    k: number,
    split_strategy?: string,
  }
};

const config: Config = {
  model: "rf",
  category: "regression",
  parameters: {
    tree: 1000, // default
    // maxfeat:
  },
  training_set: traingDataPath,
  model_file: modelPath,
  output_file: outputPath,
  cross_validation: {
    create_splits: true,
    splits_file: splitsPath,
    k: 5,
  }
};

console.log(JSON.stringify(config));