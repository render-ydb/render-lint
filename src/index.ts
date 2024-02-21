import { GetConfigFn, GetLintConfigFn } from "./types";
import { merge } from "lodash";
import path = require("path");
import requireAll = require("require-all");

export const eslint = requireAll({
  dirname: path.resolve(__dirname, "config/eslint"),
});

export const stylelint = requireAll({
  dirname: path.resolve(__dirname, "config/stylelint"),
});

export const prettier = requireAll({
  dirname: path.resolve(__dirname, "config/prettier"),
});

export const commitlint = requireAll({
  dirname: path.resolve(__dirname, "config/commitlint"),
});

const getConfig: GetConfigFn = (configs, rule, customConfig) => {
  if (!configs[rule]) {
    throw new Error(`Rule '${rule}' not Support!`);
  }
  return merge(configs[rule], customConfig || {});
};

// ESLint
export const getESLintConfig: GetLintConfigFn = function (rule, customConfig) {
  return getConfig(eslint, rule, customConfig);
};

// stylelint
export const getStylelintConfig: GetLintConfigFn = (rule, customConfig) => {
  return getConfig(stylelint, rule, customConfig);
};

// prettier
export const getPrettierConfig: GetLintConfigFn = (rule, customConfig) => {
  return getConfig(prettier, rule, customConfig);
};

// commitlint
export const getCommitlintConfig: GetLintConfigFn = (rule, customConfig) => {
  return getConfig(commitlint, rule, customConfig);
};

export { LintConfig } from "./types";
