import path = require("path");
import fs = require("fs");
import fse = require("fs-extra");
import chalk = require("chalk");
import { RenderCommand, CommandType } from "@x.render/render-command";
import { LintConfig, Json, ToolKey } from "@/types";
import { runTask } from "@x.render/render-node-utils";
import { getLintConfig, validateLintConfig, getScripts } from "../../utils";
import {
  CWD_PATH,
  LINT_TOOL_CONFIG,
  LINT_TOOL_KEYS,
  HUSKY_DIR_PATH,
} from "../../constants";
import {
  getPathsOfFilesMatchingPattern,
  log,
} from "@x.render/render-node-utils";
import cp = require("child_process");

const inquirer = require("inquirer");

class InitCommand extends RenderCommand {
  lintConfig: LintConfig;
  tools: {
    [K in keyof LintConfig]?: Json;
  };

  constructor(strs: string, options: Json, cmd: CommandType) {
    super(strs, options, cmd);
    this.lintConfig = {};
    this.tools = {};
    this.prepare();
  }

  prepare() {
    const { force } = this.options;
    if (!force) {
      inquirer
        .prompt([
          {
            type: "confirm",
            message:
              "this operation will add relevant lint configuration files to the project. Do you want to continue?",
            default: false,
            name: "eject",
          },
        ])
        .then((answers: { eject: boolean }) => {
          const { eject } = answers;
          if (eject) {
            this.init();
          }
        });
    } else {
      this.init();
    }
  }

  async init() {
    this.lintConfig = await getLintConfig();
    this.exec();
  }

  async exec() {
    this.validateConfig();
    await this.getLintConfigStrs();
    await this.generateHuskyFile();
    this.addScriptToPkg();
  }

  addScriptToPkg() {
    const destPath = path.resolve(CWD_PATH, "package.json");
    const pkg = require(destPath);
    const pkgScripts = pkg.scripts || {};
    const pkgLintStaged = pkg["lint-staged"] || {};
    const shellConfig = getScripts(Object.keys(this.lintConfig));
    const { scripts = {}, lintStagedConfig = {} } = shellConfig;
    pkg.scripts = { ...pkgScripts, ...scripts };
    if (Object.keys(lintStagedConfig).length) {
      pkg["lint-staged"] = { ...pkgLintStaged, ...lintStagedConfig };
    }

    const pkgStr = JSON.stringify(pkg, null, 2);
    const ws = fs.createWriteStream(destPath);
    ws.write(pkgStr, "utf-8");
    ws.end(() => {
      log.success(chalk.green("successfully configured the scripts command."));
    });
  }

  async generateHuskyFile() {
    const lintConfig = this.lintConfig;
    const { eslint, commitlint, stylelint, prettier } = lintConfig;
    if (!Object.keys(lintConfig).length) {
      return;
    }

    fse.copySync(HUSKY_DIR_PATH, path.resolve(CWD_PATH, ".husky"));
    if (!commitlint) {
      fse.removeSync(path.resolve(CWD_PATH, ".husky/commit-msg"));
    }
    if (!eslint && !prettier && !stylelint) {
      fse.removeSync(path.resolve(CWD_PATH, ".husky/pre-commit"));
    }
    cp.exec("npx husky install", { cwd: CWD_PATH });
    //bugfix:  The '.husky/pre-commit' hook was ignored because it's not set as execu
    if (process.platform !== "win32") {
      cp.exec("chmod 777 .husky/*", { cwd: CWD_PATH });
    }
  }

  async generateConfigFile(
    filePath: string,
    filename: string,
    content: string,
    pattern: string | Array<string>
  ) {
    return new Promise<void>((resolve) => {
      if (getPathsOfFilesMatchingPattern(pattern).length) {
        resolve();
      } else {
        const ws = fs.createWriteStream(filePath);
        ws.write(content, "utf-8");
        ws.end(() => {
          resolve();
        });
      }
    });
  }

  async getLintConfigStrs() {
    for (const key of LINT_TOOL_KEYS) {
      let toolName = key as ToolKey;
      const lintTool = this.lintConfig[toolName];
      const lintToolConfig = LINT_TOOL_CONFIG[toolName];
      const filename = lintToolConfig.filename;
      const tasks = [];
      if (lintTool) {
        const configStrs = lintToolConfig.getConfigStrs(lintTool["type"]);
        tasks.push({
          beginText: `${chalk.cyan("info")} ${chalk.magenta(
            "render-lint"
          )} Generating ${filename}`,
          fn: async () => {
            this.generateConfigFile(
              path.resolve(CWD_PATH, filename),
              filename,
              configStrs,
              lintToolConfig.pattern
            );
          },
          endText: `${chalk.green("success")} ${chalk.magenta(
            "render-lint"
          )} ${chalk.green(filename)} ${chalk.green(
            "generated successfully."
          )}`,
        });
      }
      await runTask(tasks);
    }
  }

  validateConfig() {
    LINT_TOOL_KEYS.forEach((key) => {
      let toolName = key as ToolKey;
      const tool = this.lintConfig[toolName];
      if (validateLintConfig(tool, toolName)) {
        this.tools[toolName] = tool;
      }
    });
  }
}

export default (...args: Array<any>) => {
  const options = args[0];
  const cmd = args[1];
  return new InitCommand("init", options, cmd);
};
