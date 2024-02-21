import path = require("path");
export const DEFAULT_LINT_CONFIG = require.resolve("../../render-lint.ts");
export const CONFIG_FILE_PATTERN = ".render-lint.(ts|js|json)";
export const CWD_PATH = process.cwd();
export const LINT_TOOL_KEYS = ["eslint", "stylelint", "prettier", "commitlint"];
export const LINT_TYPE = {
  eslint: ["common-ts", "common", "react-ts", "react"],
  stylelint: ["common", "react"],
  commitlint: ["common"],
  prettier: ["common", "react"],
};

export const HUSKY_DIR_PATH = path.resolve(
  __dirname,
  "../../lintToolConfig/husky"
);

export const LINT_TOOL_CONFIG = {
  eslint: {
    getConfigStrs: require("../../lintToolConfig/.eslintrc.js"),
    filename: ".eslintrc.js",
    pattern: ".eslintrc.(js|yml|json)",
  },
  stylelint: {
    getConfigStrs: require("../../lintToolConfig/.stylelintrc.js"),
    filename: ".stylelintrc.js",
    pattern: [
      ".stylelintrc",
      ".stylelintrc.(cjs|js|json|yaml|yml)",
      "stylelint.config.(cjs|mjs|js)",
    ],
  },
  prettier: {
    getConfigStrs: require("../../lintToolConfig/.prettierrc.js"),
    filename: ".prettierrc.js",
    pattern: [
      ".prettierrc",
      ".prettierrc.(js|json|yml|yaml|json5|mjs|cjs|toml)",
      "prettier.config.(js|mjs|cjs)",
    ],
  },
  commitlint: {
    getConfigStrs: require("../../lintToolConfig/commitlint.config.js"),
    filename: "commitlint.config.js",
    pattern: "commitlint.config.js",
  },
};
