export type MetadataFeatures = {
  query_id: string, // metadata
  query: string, // metadata
  table_id: string, // metadata
  rel: string, // target
};

export type TableFeatures = {
  row: string, // tableFeatures
  col: string, // tableFeatures
  nul: string, // tableFeatures
  in_link: string, // tableFeatures
  out_link: string, // tableFeatures
  pgcount: string, // tableFeatures
  tImp: string, // tableFeatures
  tPF: string, // tableFeatures
  PMI: string, // tableFeatures
};

export type QueryFeatures = {
  idf1: string, // queryFeatures
  idf2: string, // queryFeatures
  idf3: string, // queryFeatures
  idf4: string, // queryFeatures
  idf5: string, // queryFeatures
  idf6: string, // queryFeatures
  query_l: string, // queryFeatures
};

export type QueryTableFeatures = {
  leftColhits: string, // queryTableFeatures
  SecColhits: string, // queryTableFeatures
  bodyhits: string, // queryTableFeatures
  qInPgTitle: string, // queryTableFeatures
  qInTableTitle: string, // queryTableFeatures
  yRank: string, // queryTableFeatures
  csr_score: string, // queryTableFeatures
};

export type SemanticFeatures = {
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
};

export type Row = MetadataFeatures & TableFeatures & QueryFeatures & QueryTableFeatures & SemanticFeatures & {
  [key: string]: string
};

// export type Row = {
//   query_id: string, // metadata
//   query: string, // metadata
//   table_id: string, // metadata
//   row: string, // tableFeatures
//   col: string, // tableFeatures
//   nul: string, // tableFeatures
//   in_link: string, // tableFeatures
//   out_link: string, // tableFeatures
//   pgcount: string, // tableFeatures
//   tImp: string, // tableFeatures
//   tPF: string, // tableFeatures
//   leftColhits: string, // queryTableFeatures
//   SecColhits: string, // queryTableFeatures
//   bodyhits: string, // queryTableFeatures
//   PMI: string, // tableFeatures
//   qInPgTitle: string, // queryTableFeatures
//   qInTableTitle: string, // queryTableFeatures
//   yRank: string, // queryTableFeatures
//   csr_score: string, // queryTableFeatures
//   idf1: string, // queryFeatures
//   idf2: string, // queryFeatures
//   idf3: string, // queryFeatures
//   idf4: string, // queryFeatures
//   idf5: string, // queryFeatures
//   idf6: string, // queryFeatures
//   max: string, // bagOfEntitiesFeatures
//   sum: string, // bagOfEntitiesFeatures
//   avg: string, // bagOfEntitiesFeatures
//   sim: string, // bagOfEntitiesFeatures
//   emax: string, // wordEmbeddingsFeatures
//   esum: string, // wordEmbeddingsFeatures
//   eavg: string, // wordEmbeddingsFeatures
//   esim: string, // wordEmbeddingsFeatures
//   cmax: string, // bagOfCategoriesFeatures
//   csum: string, // bagOfCategoriesFeatures
//   cavg: string, // bagOfCategoriesFeatures
//   csim: string, // bagOfCategoriesFeatures
//   remax: string, // graphEmbeddingsFeatures
//   resum: string, // graphEmbeddingsFeatures
//   reavg: string, // graphEmbeddingsFeatures
//   resim: string, // graphEmbeddingsFeatures
//   query_l: string, // queryFeatures
//   rel: string, // target
// };

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

export type MLConfig = {
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

export type Result = MLInstance & {
  score: number
};

export type QRel = {
  topic: string,
  iteration: string,
  document: string,
  relevancy: string
};

export * from './table';
export * from './query';