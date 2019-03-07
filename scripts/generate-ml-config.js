"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config = __importStar(require("./config"));
const config = {
    model: "rf",
    category: "regression",
    parameters: {
        tree: 1000,
    },
    training_set: Config.traingDataPath,
    model_file: Config.modelPath,
    output_file: Config.outputPath,
    feature_imp_file: Config.featureImpPath,
    cross_validation: {
        create_splits: true,
        splits_file: Config.splitsPath,
        k: 5,
    }
};
console.log(JSON.stringify(config));
