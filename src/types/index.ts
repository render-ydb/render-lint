export type ToolKey = "eslint" | "commitlint" | "prettier" | "stylelint";

export interface LintConfig {
  eslint?: {
    type: "common-ts" | "common" | "react-ts" | "react";
  };
  commitlint?: {
    type: "common";
  };
  prettier?: {
    type: "common" | "react";
  };
  stylelint?: {
    type: "common" | "react";
  };
}

export type Json = Record<string, any>;
export type GetConfigFn = (
  configs: Json,
  rule: string,
  customConfig: Json
) => never | Json;

export type GetLintConfigFn = (rule: string, customConfig: Json) => Json;
