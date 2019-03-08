import * as Types from './types';
import * as Queries from './queries';
import * as Tables from './tables';

import * as ProcessTables from './process-tables';

export function generateTableFeatures(table: Types.Table): Types.TableFeatures {
  const row = table.numDataRows;
  const col = table.numCols;
  const nul = null;

  const in_link = null;
  const out_link = null;
  const pgcount = null;
  const tImp = null;
  const tPF = null;
  const PMI  = null;

  return {
    row: `${row}`,
    col: `${col}`,
    nul: `${nul}`,
    in_link: `${in_link}`,
    out_link: `${out_link}`,
    pgcount: `${pgcount}`,
    tImp: `${tImp}`,
    tPF: `${tPF}`,
    PMI: `${PMI}`,
  };
}

export function generateQueryFeatures(query: Types.Query): Types.QueryFeatures {
// IDFf (q) = ?t ∈q IDFf (t), where IDFf (t) is the IDF score of term t in field f . This feature is computed for the following fields: page title, section title, table caption, table heading, table body, and “catch-all” (the concatenation of all textual content in the table).

  // const pageTitle = table.pgTitle;
  // const sectionTitle = table.secondTitle;
  // const tableCaption = table.caption;
  // const tableHeading = table.title.join(' ');
  // const tableBody = Types.Table.bodyText(table);
  // const catchAll = [ pageTitle, sectionTitle, tableCaption, tableBody ].join('\n');

  const idf1 = Types.Query.pageTitleIDF(query);
  const idf2 = Types.Query.sectionTitleIDF(query);
  const idf3 = Types.Query.tableCaptionIDF(query);
  const idf4 = Types.Query.tableHeadingIDF(query);
  const idf5 = Types.Query.tableBodyIDF(query);
  const idf6 = Types.Query.catchAllIDF(query);

  const query_l = query.split(' ').length;

  return {
    idf1: `${idf1}`,
    idf2: `${idf2}`,
    idf3: `${idf3}`,
    idf4: `${idf4}`,
    idf5: `${idf5}`,
    idf6: `${idf6}`,
    query_l: `${query_l}`,
  };
}

export function generateQueryTableFeatures(query: Types.Query, table: Types.Table): Types.QueryTableFeatures {
  const leftColhits = Types.Table.leftColumnHits(table, query);
  const SecColhits = Types.Table.secondLeftColumnHits(table, query);
  const bodyhits = Types.Table.bodyHits(table, query);

  const query_l = query.split(' ').length;
  const pageTitle = table.pgTitle;
  const tableTitle = table.secondTitle;
  const qInPgTitle = Types.Query.hits(query, pageTitle) / query_l;
  const qInTableTitle = Types.Query.hits(query, tableTitle) / query_l;

  const yRank = null;
  const csr_score = null;

  return {
    leftColhits: `${leftColhits}`,
    SecColhits: `${SecColhits}`,
    bodyhits: `${bodyhits}`,
    qInPgTitle: `${qInPgTitle}`,
    qInTableTitle: `${qInTableTitle}`,
    yRank: `${yRank}`,
    csr_score: `${csr_score}`,
  };
}

export function generateSemanticFeatures(query: Types.Query, table: Types.Table): Types.SemanticFeatures {
  const max = null;
  const sum = null;
  const avg = null;
  const sim = null;
  const emax = null;
  const esum = null;
  const eavg = null;
  const esim = null;
  const cmax = null;
  const csum = null;
  const cavg = null;
  const csim = null;
  const remax = null;
  const resum = null;
  const reavg = null;
  const resim = null;

  return {
    max: `${max}`,
    sum: `${sum}`,
    avg: `${avg}`,
    sim: `${sim}`,
    emax: `${emax}`,
    esum: `${esum}`,
    eavg: `${eavg}`,
    esim: `${esim}`,
    cmax: `${cmax}`,
    csum: `${csum}`,
    cavg: `${cavg}`,
    csim: `${csim}`,
    remax: `${remax}`,
    resum: `${resum}`,
    reavg: `${reavg}`,
    resim: `${resim}`,
  };
}


export async function generateFeatures(qrel: Types.QRel): Promise<Types.Row> {
  const query_id = qrel.topic;
  const query = Queries.queries[query_id];
  const table_id = qrel.document;
  const table = await Tables.get(table_id);

  const metadataFeatures: Types.MetadataFeatures = {
    query_id,
    query,
    table_id,
    rel: qrel.relevancy
  };

  const tableFeatures = generateTableFeatures(table);
  const queryFeatures = generateQueryFeatures(query);
  const queryTableFeatures = generateQueryTableFeatures(query, table);
  const semanticFeatures = generateSemanticFeatures(query, table);

  return {
    ...metadataFeatures,
    ...tableFeatures,
    ...queryFeatures,
    ...queryTableFeatures,
    ...semanticFeatures,
  };
}

export const HEADER = [
  "query_id",
  "query",
  "table_id",
  "row",
  "col",
  "nul",
  "in_link",
  "out_link",
  "pgcount",
  "tImp",
  "tPF",
  "leftColhits",
  "SecColhits",
  "bodyhits",
  "PMI",
  "qInPgTitle",
  "qInTableTitle",
  "yRank",
  "csr_score",
  "idf1",
  "idf2",
  "idf3",
  "idf4",
  "idf5",
  "idf6",
  "max",
  "sum",
  "avg",
  "sim",
  "emax",
  "esum",
  "eavg",
  "esim",
  "cmax",
  "csum",
  "cavg",
  "csim",
  "remax",
  "resum",
  "reavg",
  "resim",
  "query_l",
  "rel"
];

export function sortRowValues(row: Types.Row, order: string[]): string[] {
  return order.map(prop => row[prop]);
}

export async function doThings() {
  await ProcessTables.doThings();

  console.log(HEADER.join(','));
  return Queries.qrels.reduce(async (memo, qrel) => {
    if (qrel.document !== "table-0001-249") return memo; // Using only a subset of the data for development, this one in the qrels as well
    await memo;

    const features = await generateFeatures(qrel);
    const values = sortRowValues(features, HEADER);
    console.log(values.join(','));

    return
  }, Promise.resolve());
}

doThings();