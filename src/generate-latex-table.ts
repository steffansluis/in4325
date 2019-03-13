import csv from 'csvtojson';

import * as path from 'path';

import * as Config from './config';
import { summarizeResults } from './summarize-results';


export async function getSignificances() {
  console.log('Getting significances!', Config.significancesFilePath);
  try {
    const data = await (csv().fromFile(Config.significancesFilePath));
    console.log('significances got', data);
    return data;

  }catch(e) {
    console.error(e)
    throw e;
  }

}
// import { exec } from 'child_process';

// export async function testSignificance(path1, path2): Promise<string> {
//   // console.log(`Testing significance of ${path1} against ${path2} with command:`, `PYTHONWARNINGS="ignore" python ttest.py ${path1} ${path2} ndcg`);
//   return new Promise((resolve, reject) => {
//     // return resolve('bla');
//     try {
//
//       exec(`PYTHONWARNINGS="ignore" python ttest.py ${path1} ${path2} ndcg`, (err, stdout, stderr) => {
//         console.log('Bla!', arguments);
//         // if (err) {
//         //   // node couldn't execute the command
//         //   console.error(err);
//         //   reject(err);
//         //   return;
//         // }
//
//         return resolve(stdout);
//         // const [ result ] = stdout.split('\n').slice(1, 1);
//         //
//         // return resolve(result);
//
//         // the *entire* stdout and stderr (buffered)
//         // console.log(`stdout: ${stdout}`);
//         // console.log(`stderr: ${stderr}`);
//       });
//     } catch(e) {
//       console.error(e);
//     }
//   });
// };

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

// export async function calculateSignificance(key) {
//   const baseFile = path.join(Config.summarizedResultsPath, `lexicalFeatures_eval.txt`);
//   const resultFile = path.join(Config.summarizedResultsPath, `${key}_eval.txt`);
//
//   return testSignificance(baseFile, resultFile);
// }

export async function generateTable(): Promise<string> {
  const results = summarizeResults();
  const significances = await getSignificances();

  console.log(significances);

  const resultValues = await order.reduce(async (memo, key) => {

    const [ line ] = results[key].slice(-1);
    const [ , ,  value ] = line.split(/\s+/);

    return [
      ...(await memo),
      value.slice(0,6)
    ];
    // const num = parseFloat(value);
  }, Promise.resolve([]));


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
  // const key = "all_all";
  // const baseFile = path.join(Config.summarizedResultsPath, `lexicalFeatures_eval.txt`);
  // const resultFile = path.join(Config.summarizedResultsPath, `${key}_eval.txt`);

  // console.log('Bla1');
  // const significance = await testSignificance(baseFile, resultFile);
  // console.log(significance);
  // const table = await generateTable();
  // console.log(table);
  const significances = await getSignificances();

  console.log(significances);
}

doThings() //.then(() => process.exit(0));