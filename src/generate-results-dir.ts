import { exec } from 'child_process';

export async function generateResultsDir(name): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`mkdir -p result/${name}`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        reject(err);
        return;
      }

      return resolve();

      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
    });
  });
}