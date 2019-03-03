"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const csvFilePath = path.join(__dirname, '../data/features.csv');
const queryFeatures = {
    query_l: true,
    idf1: true,
    idf2: true,
    idf3: true,
    idf4: true,
    idf5: true,
    idf6: true,
};
const tableFeatures = {
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
const queryTableFeatures = {
    leftColhits: true,
    SecColhits: true,
    bodyhits: true,
    qInPgTitle: true,
    qInTableTitle: true,
    yRank: true,
    csr_score: true,
};
const lexicalFeatures = Object.assign({}, queryFeatures, tableFeatures, queryTableFeatures);
const bagOfEntitiesFeatures = {
    max: true,
    sum: true,
    avg: true,
    sim: true,
};
const bagOfCategoriesFeatures = {
    cmax: true,
    csum: true,
    cavg: true,
    csim: true,
};
const wordEmbeddingsFeatures = {
    ecmax: true,
    ecsum: true,
    ecavg: true,
    ecsim: true,
};
const graphEmbeddingsFeatures = {
    recmax: true,
    recsum: true,
    recavg: true,
    recsim: true,
};
const semanticFeatures = Object.assign({}, bagOfEntitiesFeatures, bagOfCategoriesFeatures, wordEmbeddingsFeatures, graphEmbeddingsFeatures);
const allFeatures = Object.assign({}, lexicalFeatures, semanticFeatures);
function extractFeatures(row, features) {
    return Object.keys(features).reduce((memo, key) => {
        if (!features[key])
            return memo;
        return Object.assign({}, memo, { [key]: row[key] });
    }, {});
}
exports.extractFeatures = extractFeatures;
async function generateTrainingSet(featuresEnabled = allFeatures) {
    const jsonArray = await csvtojson_1.default().fromFile(csvFilePath);
    const data = jsonArray.map(row => {
        const { query, query_id, table_id, rel } = row;
        const features = extractFeatures(row, featuresEnabled);
        return {
            properties: {
                query_id,
                query,
                table_id,
            },
            target: rel,
            features
        };
    });
    return data;
}
async function doThings() {
    const data = await generateTrainingSet();
    console.log(JSON.stringify(data));
}
exports.doThings = doThings;
doThings();
