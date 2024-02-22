# render-lint

<p>
<a href="https://www.npmjs.com/package/@x.render/render-lint" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/render-lint" alt="NPM version"></a>

<a href="https://www.npmjs.com/package/@x.render/render-lint" target="__blank"><img src="https://img.shields.io/npm/dw/%40x.render%2Frender-lint
" alt="NPM Downloads"></a>

</p>

<br/>

[中文文档](./README.zh.md)

## Introduce

A lintflow, a one-stop code verification environment setup that supports ESLint, Stylelint, Prettier, and Commitlint.

there is no need for cumbersome configuration, and various verification tools are ready to use out of the box, which reduces complicated configuration and improves the time for project engineering to take shape.

## Usage

```sh
npm i @x.render/render-lint -D
```

After installing render-lint, there is no need to separately install eslint, stylelint, prettier, husky and other tools, it can be used directly out of the box.

### command

After installing render-lint, the terminal can use the following commands to automatically generate various rule verifications.

```sh
npx render-lint init
```

using the force parameter will force the relevant configuration files to be generated in the root directory of your project.

```sh
npx render-lint init --force
```

## Configuration

The configuration file format supported by render-lint is: .render-lint.(ts|js|json). If you do not use a configuration file, render-lint will use the default configuration file .render-lint.ts.

the configuration of `type` means using the specified type of verification rule set, for example: `common-ts`, `common`, `react-ts`, `react`

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

currently getESLintConfig supports the acquisition of four rule sets: `common-ts`, `common`, `react-ts`, and `react`.

#### Stylelint configuration file

Add the .stylelintrc.js file in the project root directory.

```javascript
const { getStylelintConfig } = require("@x.render/render-lint");

module.exports = getStylelintConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getStylelintConfig supports the acquisition of `common` and `react` rule sets.

#### Prettier configuration file

Add the .prettierrc.js file in the project root directory.

```javascript
const { getPrettierConfig } = require("@x.render/render-lint");

module.exports = getPrettierConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getPrettierConfig supports the acquisition of `common` and `react` rule sets.

#### Commitlint configuration file

Add the commitlint.config.js file in the project root directory.

```javascript
const { getCommitlintConfig } = require("@x.render/render-lint");

module.exports = getCommitlintConfig("react", {
  // Custom rules have a higher priority than the internal rules in render-lint.
});
```

currently, getCommitlintConfig supports the acquisition of `common` and `react` rule sets.

## Q&A

- Q1: I want to use eslint to check react projects written in typescript. How to configure it?

  - A1: You can configure the following in your render-lint configuration file:

  ```javascript
  import { LintConfig } from "@x.render/render-lint";
  const lintConfig: LintConfig = {
    eslint: {
      type: "react-ts",
    },
  };
  export default lintConfig;
  ```

  then run the `render-lint init` command to obtain the corresponding rule set

  - A2: You can also actively obtain the relevant rule sets when generating the eslint configuration file.

  ```javascript
  const { getESLintConfig } = require("@x.render/render-lint");

  module.exports = getESLintConfig("react-ts", {
    // Custom rules have a higher priority than the internal rules in render-lint.
  });
  ```

  - Q2: The internal rules in render-lint do not meet my current needs. How should I use custom configuration?
  - A1: Here is an example of modifying the configuration of eslint:

  ```javascript
  const { getESLintConfig } = require("@x.render/render-lint");

  module.exports = getESLintConfig("react-ts", {
    // 自定义规则的优先级高于 render-lint 中的内部规则。
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  });
  ```

  In short, how did you modify the configuration of eslint, stylelint, etc. before? If you modify it like this now, render-lint does not do other magic things.
