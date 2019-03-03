"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const traingDataPath = path.join(__dirname, '../data/training-data.json');
const modelPath = path.join(__dirname, '../data/model');
const splitsPath = path.join(__dirname, '../data/splits');
const outputPath = path.join(__dirname, '../data/output.tsv');
const config = {
    model: "rf",
    category: "regression",
    parameters: {
        tree: 1000,
    },
    training_set: traingDataPath,
    model_file: modelPath,
    output_file: outputPath,
    cross_validation: {
        create_splits: true,
        splits_file: splitsPath,
        k: 5,
    }
};
console.log(JSON.stringify(config));
