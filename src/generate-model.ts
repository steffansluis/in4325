import * as path from 'path'
import { spawn } from 'child_process';

// const { spawn } = require('child_process');

// use child.stdout.setEncoding('utf8'); if you want text chunks


export async function generateModel(configPath): Promise<void> {
  return new Promise((resolve, reject) => {
    // const child = spawn('cat', [ 'eval.txt' ], { cwd: path.join(__dirname, '../result') });
    const child = spawn('python', [ '-m', 'nordlys.core.ml.ml', configPath ], { cwd: path.join(__dirname, '../nordlys') } );
    // const child = spawn(`(cd nordlys && python -m nordlys.core.ml.ml ${configPath})`);
    child.on('error', err => reject(err));

    // child.stdout.on('data', (chunk) => {
    //   // console.log('Bla!');
    //   // data from standard output is here as buffers
    //   console.log(chunk.toString());
    // });

    child.stderr.on('data', (chunk) => {
      // console.log('Bla!');
      // data from standard output is here as buffers
      process.stdout.write(chunk.toString());
    });

    // since these are streams, you can pipe them elsewhere
    // child.stderr.pipe(dest);

    child.on('close', (code) => {
      // console.log(`child process exited with code ${code}`);
      return resolve();
    });

  //   exec(, (err, stdout, stderr) => {
  //     if (err) {
  //       // node couldn't execute the command
  //       reject(err);
  //       return;
  //     }
  //
  //     return resolve();
  //
  //     // the *entire* stdout and stderr (buffered)
  //     // console.log(`stdout: ${stdout}`);
  //     // console.log(`stderr: ${stderr}`);
  //   });
  });
}