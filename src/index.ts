  import * as fs from 'fs';

  import * as Types from './types';
  import * as Config from './config';
  import * as Features from './features';

  import { generateResultsDir } from './generate-results-dir';
  import { generateTrainingSet } from './generate-training-data';
  import { generateModel } from './generate-model';
  import { generateRunfile } from './generate-runfile';
  import { generateEvaluation } from './generate-evaluation';
  // import { generateConfig } from './generate-ml-config';

async function process(name, features) {
  console.log(`Processing ${name}...`);
  const paths = Config.paths(name);
  await generateResultsDir(name);

  console.log(`Generating ${name} training data...`);
  const data = await generateTrainingSet(features);

  const trainingPath = paths.traingDataPath;
  const trainingData = Buffer.from(JSON.stringify(data));
  fs.writeFileSync(trainingPath, trainingData);

  const mlConfig = {
    model: "rf",
    category: "regression",
    parameters: {
      tree: 1000, // default
      // maxfeat:
    },
    training_set: paths.traingDataPath,
    model_file: paths.modelPath,
    output_file: paths.outputPath,
    feature_imp_file: paths.featureImpPath,
    cross_validation: {
      create_splits: true,
      splits_file: paths.splitsPath,
      k: 5,
    }
  };

  const configPath = paths.configPath;
  const configData = Buffer.from(JSON.stringify(mlConfig));
  fs.writeFileSync(configPath, configData);

  console.log(`Generating ${name} model...`);
  await generateModel(configPath);

  console.log(`Processing ${name} results...`);
  const rawResults = fs.readFileSync(paths.outputPath).toString();
  const results: Types.Result[] = Object.values(JSON.parse(rawResults));

  const rawQueries = fs.readFileSync(paths.queriesPath).toString();
  const queries = rawQueries.split('\n').slice(0, -1).map(line => {
    const [ _, query_id, query ] = line.split(/^([0-9]*) /)
    return {
      query_id,
      query
    };
  });

  const runfile = generateRunfile(results, queries);

  const runfilePath = paths.runfilePath;
  const runfileData = Buffer.from(runfile);
  fs.writeFileSync(runfilePath, runfileData);

  console.log(`Generating ${name} evaluation...`);
  const evaluation = await generateEvaluation(runfilePath);
  const evaluationPath = paths.evaluationPath;
  const evaluationData = Buffer.from(evaluation);
  fs.writeFileSync(evaluationPath, evaluationData);

  console.log(`Done processing ${name}.`);
}

async function doStuff() {
  await Object.entries(Features.configurations).reduce(async (memo, [ name, features ]) => {
    await memo;
    return process(name, features);
  }, Promise.resolve());
}

doStuff();