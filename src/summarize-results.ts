import * as fs from 'fs';
import * as path from 'path';

import * as Config from './config';

const dataPaths = [
  "all_all",
  "all_lateMax",
  "all_early",
  "all_lateSum",
  "all_lateAvg",
  "bagOfCategories_all",
  "bagOfCategories_Avg",
  "bagOfCategories_Max",
  "bagOfCategories_Sim",
  "bagOfCategories_Sum",
  "bagOfEntities_all",
  "bagOfEntities_Avg",
  "bagOfEntities_Max",
  "bagOfEntities_Sim",
  "bagOfEntities_Sum",
  "graphEmbeddings_all",
  "graphEmbeddings_Avg",
  "graphEmbeddings_Max",
  "graphEmbeddings_Sim",
  "graphEmbeddings_Sum",
  "lexicalFeatures",
  "wordEmbeddings_all",
  "wordEmbeddings_Avg",
  "wordEmbeddings_Max",
  "wordEmbeddings_Sim",
  "wordEmbeddings_Sum",
];

export function summarizeLines(lines: string[]): string {
  let metric, query_id;
  const { value: sum } = lines.reduce((memo, line) => {
    let value;
    [ metric, query_id,  value ] = line.split(/\s+/);
    const num = parseFloat(value);

    return {
      value: memo.value + num
    };
  }, { value: 0 });
  const avg = sum/lines.length;

  return `${metric}                  	${query_id} ${avg}`;
}

export function summarizeResults(): { [key: string]: string[] } {
  // console.log('Result paths:', dataPaths);
  return dataPaths.reduce((memo, dataPath) => {
    const resultPaths = Config.resultPaths.map(resultPath => path.join(resultPath, dataPath, 'eval.txt'));
    // console.log('Result paths:', resultPaths);
    const evals = resultPaths.map(p => {
      const raw = fs.readFileSync(p).toString();
      const lines = raw.split('\n').slice(0, -1);
      return lines;
    });

    const evalLength = evals[0].length;
    const [ head, ...tail ] = evals;
    const summarized = head.reduce((memo, line, index) => {
      const otherLines = tail.map(lines => lines[index]);
      const lines = [].concat(line, otherLines);
      const summarizedLine = summarizeLines(lines);

      return [
        ...memo,
        summarizedLine
      ];
    }, [])

    return {
      ...memo,
      [dataPath]: summarized
    };
  }, {});
}

export async function doThings() {
  const summarized = summarizeResults();
  await Object.entries(summarized).reduce(async (memo, [ dataPath, summary]) => {
    await memo;

    const outputPath = path.join(Config.summarizedResultsPath, `${dataPath}_eval.txt`);

    return fs.writeFileSync(outputPath, Buffer.from(summary.join('\n')));

  }, Promise.resolve())
  // console.log(summarized['all_all']);
}

doThings().then(() => process.exit(0));