import * as Types from './types';

export const queryFeatures: Types.Features = {
  query_l: true,
  idf1: true,
  idf2: true,
  idf3: true,
  idf4: true,
  idf5: true,
  idf6: true,
};

export const tableFeatures: Types.Features = {
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

export const queryTableFeatures: Types.Features = {
  leftColhits: true,
  SecColhits: true,
  bodyhits: true,
  qInPgTitle: true,
  qInTableTitle: true,
  yRank: true,
  csr_score: true,
};

export const lexicalFeatures: Types.Features = {
  ...queryFeatures,
  ...tableFeatures,
  ...queryTableFeatures,
};

export const bagOfEntitiesFeatures: Types.Features = {
  max: true,
  sum: true,
  avg: true,
  sim: true,
};

export const bagOfCategoriesFeatures: Types.Features = {
  cmax: true,
  csum: true,
  cavg: true,
  csim: true,
};

export const wordEmbeddingsFeatures: Types.Features = {
  emax: true,
  esum: true,
  eavg: true,
  esim: true,
};

export const graphEmbeddingsFeatures: Types.Features = {
  remax: true,
  resum: true,
  reavg: true,
  resim: true,
};

export const earlyFeatures: Types.Features = {
  sim: true,
  csim: true,
  esim: true,
  resim: true,
};

export const lateMaxFeatures: Types.Features = {
  max: true,
  cmax: true,
  emax: true,
  remax: true,
};

export const lateSumFeatures: Types.Features = {
  sum: true,
  csum: true,
  esum: true,
  resum: true,
};

export const lateAvgFeatures: Types.Features = {
  avg: true,
  cavg: true,
  eavg: true,
  reavg: true,
};

export const semanticFeatures: Types.Features = {
  ...bagOfEntitiesFeatures,
  ...bagOfCategoriesFeatures,
  ...wordEmbeddingsFeatures,
  ...graphEmbeddingsFeatures,
};

export const allFeatures: Types.Features = {
  ...lexicalFeatures,
  ...semanticFeatures,
};

export const representations = {
  '': 'bagOfEntities',
  'c': 'bagOfCategories',
  'e': 'wordEmbeddings',
  're': 'graphEmbeddings'
};

export const configurations: { [key:string]: Types.Features } = Object.keys(semanticFeatures).reduce((memo, feature) => {
  const semanticRepresentation = representations[feature.slice(0, -3)];
  const similarityMeasure = feature.slice(-3);
  const name = `${semanticRepresentation}_${similarityMeasure[0].toUpperCase()}${similarityMeasure.slice(1)}`;

  return {
    ...memo,
    [name]: { ...lexicalFeatures, [feature]: true}
  }
}, {
  'bagOfEntities_all': { ...lexicalFeatures, ...bagOfEntitiesFeatures },
  'bagOfCategories_all': { ...lexicalFeatures, ...bagOfCategoriesFeatures },
  'wordEmbeddings_all': { ...lexicalFeatures, ...wordEmbeddingsFeatures },
  'graphEmbeddings_all': { ...lexicalFeatures, ...graphEmbeddingsFeatures },

  'all_early': { ...lexicalFeatures, ...earlyFeatures },
  'all_lateMax': { ...lexicalFeatures, ...lateMaxFeatures },
  'all_lateSum': { ...lexicalFeatures, ...lateSumFeatures },
  'all_lateAvg': { ...lexicalFeatures, ...lateAvgFeatures },

  'all_all': allFeatures
});