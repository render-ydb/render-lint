import { isObject } from "lodash";
import {
  getPathsOfFilesMatchingPattern,
  loadConfig,
} from "@x.render/render-node-utils";
import {
  CONFIG_FILE_PATTERN,
  DEFAULT_LINT_CONFIG,
  LINT_TYPE,
} from "../constants";
import { LintConfig, ToolKey } from "@/types";

export const getLintConfig = async () => {
  const filePath =
    getPathsOfFilesMatchingPattern(CONFIG_FILE_PATTERN)[0] ||
    DEFAULT_LINT_CONFIG;
  return (await loadConfig<LintConfig>(filePath)) as Promise<LintConfig>;
};

export const validateLintConfig = (
  config:
    | LintConfig["eslint"]
    | LintConfig["commitlint"]
    | LintConfig["stylelint"]
    | LintConfig["prettier"],
  key: ToolKey
) => {
  const types = LINT_TYPE[key] || [];
  if (!config) {
    return;
  }
  if (!isObject(config)) {
    throw new Error(`the type of ${config} configuration must be an object`);
  }
  if (!types.includes(config.type)) {
    throw new Error(
      `the value of the 'type' property in the ${key} must be one of: ${types.join(
        "、"
      )}`
    );
  }
  return true;
};

export const getScripts = require("../../lintToolConfig/script.js");
