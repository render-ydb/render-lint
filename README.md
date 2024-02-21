# render-lint

## Introduce

A lintflow, a one-stop code verification environment setup that supports ESLint, Stylelint, Prettier, and Commitlint.

there is no need for cumbersome configuration, and various verification tools are ready to use out of the box, which reduces complicated configuration and improves the time for project engineering to take shape.

## Usage

```sh
npm i @x.render/render-lint -D
```

After installing render-lint, there is no need to separately install eslint, stylelint, prettier, husky and other tools, it can be used directly out of the box.

## Configuration

The configuration file format supported by render-lint is: .render-lint.(ts|js|json). If you do not use a configuration file, render-lint will use the default configuration file .render-lint.ts.

the configuration of <mark>type</mark> means using the specified type of verification rule set, for example: <mark>common-ts</mark>, <mark>common</mark>, <mark>react-ts</mark>, <mark></mark>

### Default configuration

The content in the default configuration file is as follows

```javascript
import { LintConfig } from "@x.render/render-lint";
const lintConfig: LintConfig = {
  eslint: {
    type: "common",
  },
  stylelint: {
    type: "common",
  },
  commitlint: {
    type: "common",
  },
};
export default lintConfig;
```

the above configuration indicates using eslint, stylelint, and commitlint to verify project code.

### Use js configuration file

Create a new .render-lint.js file in the root directory of the project and write the following content.

```javascript
module.exports = {
  eslint: {
    type: "common",
  },
  commitlint: {
    type: "common",
  },
  prettier: {
    type: "common",
  },
  stylelint: {
    type: "common",
  },
};
```

### Use json configuration file

Create a new .render-lint.json file in the root directory of the project and write the following content.

```json
{
  "eslint": {
    "type": "common"
  },
  "commitlint": {
    "type": "common"
  },
  "prettier": {
    "type": "common"
  },
  "stylelint": {
    "type": "common"
  }
}
```

The render-lint scaffolding will implement on-demand configuration based on the configuration in the configuration file. The following configuration will only generate eslint-related configurations.

```javascript
import { LintConfig } from "@x.render/render-lint";
const lintConfig: LintConfig = {
  eslint: {
    type: "common",
  },
};
export default lintConfig;
```

you can use different configurations based on the actual situation of your project.

## Render-lint command

After installing render-lint, the terminal can use the following commands to automatically generate various rule verifications.

```sh
npx render-lint init
```

## Lint tool files

After the init command is executed, render-lint will generate some files based on the configuration. These files can be used to verify the code style, commit information format verification, etc.

#### Eslint configuration file

Add the .eslintrc.js file in the project root directory.

```javascript
const { getESLintConfig } = require("@x.render/render-lint");

module.exports = getESLintConfig("common", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently getESLintConfig supports the acquisition of four rule sets: common-ts, common, react-ts, and react.

#### Stylelint configuration file

Add the .stylelintrc.js file in the project root directory.

```javascript
const { getStylelintConfig } = require("@x.render/render-lint");

module.exports = getStylelintConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getStylelintConfig supports the acquisition of common and react rule sets.

#### Prettier configuration file

Add the .prettierrc.js file in the project root directory.

```javascript
const { getPrettierConfig } = require("@x.render/render-lint");

module.exports = getPrettierConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getPrettierConfig supports the acquisition of common and react rule sets.

#### Commitlint configuration file

Add the commitlint.config.js file in the project root directory.

```javascript
const { getCommitlintConfig } = require("@x.render/render-lint");

module.exports = getCommitlintConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getCommitlintConfig supports the acquisition of common and react rule sets.
