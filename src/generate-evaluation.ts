import { exec } from 'child_process';
import * as Config from './config';

export async function generateEvaluation(runfilePath): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`trec_eval -m ndcg -q data/qrels.txt ${runfilePath}`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        reject(err);
        return;
      }

      return resolve(stdout);

      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
    });
  });
}