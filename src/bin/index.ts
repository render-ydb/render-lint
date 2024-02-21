#!/usr/bin/env node

import { RenderCommander } from "@x.render/render-command";
import initCommand from "./command/init";
import { log } from "@x.render/render-node-utils";
log.setGlobalPrefix("render-lint");
const pkg = require("../../package.json");

const program = new RenderCommander();

try {
  program
    .name("render-lint")
    .description(
      "LintFlow: A foundational code style enforcement and formatting tool for your project."
    )
    .version(pkg.version);

  program
    .command("init")
    .description(
      "automatically generate relevant configuration files based on the render-lint configuration."
    )
    .option(
      "--force",
      "enforce the generation of configuration files for the linting tool."
    )
    .action((...args) => {
      initCommand(...args);
    });

  program.parse();
} catch (err) {
  log.error(err);
  process.exit(1);
}

process.on("uncaughtException", function (err) {
  log.error(err);
  process.exit(1);
});
