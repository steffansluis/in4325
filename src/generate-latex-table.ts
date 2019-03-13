import { summarizeResults } from './summarize-results';

const order = [
  "bagOfEntities_Sim",
  "bagOfEntities_Max",
  "bagOfEntities_Sum",
  "bagOfEntities_Avg",
  "bagOfEntities_all",

  "bagOfCategories_Sim",
  "bagOfCategories_Max",
  "bagOfCategories_Sum",
  "bagOfCategories_Avg",
  "bagOfCategories_all",

  "wordEmbeddings_Sim",
  "wordEmbeddings_Max",
  "wordEmbeddings_Sum",
  "wordEmbeddings_Avg",
  "wordEmbeddings_all",

  "graphEmbeddings_Sim",
  "graphEmbeddings_Max",
  "graphEmbeddings_Sum",
  "graphEmbeddings_Avg",
  "graphEmbeddings_all",

  "all_early",
  "all_lateMax",
  "all_lateSum",
  "all_lateAvg",
  "all_all",
];

export function generateTable(): string {
  const results = summarizeResults();

  const resultValues = order.map(key => {
    const [ line ] = results[key].slice(-1);
    const [ , ,  value ] = line.split(/\s+/);

    return value.slice(0,6);
    // const num = parseFloat(value);
  });

  return `
\\begin{table*}[!hbtp]
    \\centering
    \\begin{tabular}{ c c c c c >{\\columncolor{gray!30}}c }
        \\hline
        \\textbf{Sem. Repr.} & \\textbf{Early} & \\textbf{Late-max} & \\textbf{Late-sum} & \\textbf{Late-avg} & \\textbf{ALL} \\\\ \\hline
        Bag-of-Entities         & ${resultValues[0]}   & ${resultValues[1]}   & ${resultValues[2]}   & ${resultValues[3]}   & ${resultValues[4]} \\\\
        Bag-of-Categories       & ${resultValues[5]}   & ${resultValues[6]}   & ${resultValues[7]}   & ${resultValues[8]}   & ${resultValues[9]} \\\\
        Word embeddings         & ${resultValues[10]}  & ${resultValues[11]}  & ${resultValues[12]}  & ${resultValues[13]}  & ${resultValues[14]} \\\\
        Graph embeddings        & ${resultValues[15]}  & ${resultValues[16]}  & ${resultValues[17]}  & ${resultValues[18]}  & ${resultValues[19]} \\\\
        \\rowcolor{gray!30} ALL  & ${resultValues[20]}  & ${resultValues[21]}  & ${resultValues[22]}  & ${resultValues[23]}  & ${resultValues[24]} \\\\
        \\hline
    \\end{tabular}
    \\caption{Comparison of semantic features, used in combination with baseline features, in terms of NDCG@20. Relative improvements are shown in parentheses. Statistical significance is tested against the LTR baseline.}
    \\label{tab:ndcg_at_20}
\\end{table*}`;
}

export async function doThings() {
  const table = generateTable();
  console.log(table);
}

doThings().then(() => process.exit(0));