# render-lint

<p>
<a href="https://www.npmjs.com/package/@x.render/render-lint" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/render-lint" alt="NPM version"></a>

<a href="https://www.npmjs.com/package/@x.render/render-lint" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Frender-lint" alt="NPM Downloads" /></a>

</p>

[英文文档](./README.md)

## 介绍

一种 lintflow，一站式代码验证环境设置，支持 ESLint、Stylelint、Prettier 和 Commitlint。

无需繁琐的配置，各种验证工具开箱即用，减少了复杂的配置，提高了项目工程成型的时间。

## 使用

```sh
npm i @x.render/render-lint -D
```

安装 render-lint 后，无需单独安装 eslint、stylelint、prettier、husky 等工具，直接开箱即可使用。

### 命令

安装 render-lint 后，终端可以使用以下命令自动生成各种规则验证。

```sh
npx render-lint init
```

使用 force 参数将强制在项目的根目录中生成相关的配置文件。

```sh
npx render-lint init --force
```

## 配置

render-lint 支持的配置文件格式为：.render-lint.(ts|js|json)。 如果不使用配置文件，render-lint 将使用默认配置文件 .render-lint.ts。

type 配置表示使用指定类型的验证规则集，例如：`common-ts`、`common`、`react-ts`、`react`。

### 默认配置

默认配置文件中的内容如下：

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

上述配置表示使用 eslint、stylelint 和 commitlint 来校验项目代码。

### 使用 js 配置文件

在项目根目录下新建.render-lint.js 文件，写入以下内容。

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

### 使用 json 配置文件

在项目根目录下新建.render-lint.json 文件，写入以下内容。

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

render-lint 脚手架会根据配置文件中的配置实现按需配置。 以下配置只会生成 eslint 相关的配置。

```javascript
import { LintConfig } from "@x.render/render-lint";
const lintConfig: LintConfig = {
  eslint: {
    type: "common",
  },
};
export default lintConfig;
```

您可以根据项目的实际情况使用不同的配置。

## 校验工具的配置文件

执行 init 命令后，render-lint 会根据配置生成一些文件。 这些文件可以用来验证代码风格、提交信息格式验证等。

#### Eslint 配置文件

在项目根目录下添加 .eslintrc.js 文件。

```javascript
const { getESLintConfig } = require("@x.render/render-lint");

module.exports = getESLintConfig("common", {
  // 自定义规则的优先级高于 render-lint 中的内部规则。
});
```

目前 getESLintConfig 支持获取四种规则集：`common-ts`、`common`、`react-ts` 和 `react`。

#### Stylelint 配置文件

在项目根目录下添加 .stylelintrc.js 文件。

```javascript
const { getStylelintConfig } = require("@x.render/render-lint");

module.exports = getStylelintConfig("react", {
  // 自定义规则的优先级高于 render-lint 中的内部规则。
});
```

目前，getStylelintConfig 支持获取 `common` 和 `react` 规则集。

#### Prettier 配置文件

在项目根目录下添加 .prettierrc.js 文件。

```javascript
const { getPrettierConfig } = require("@x.render/render-lint");

module.exports = getPrettierConfig("react", {
  // 自定义规则的优先级高于 render-lint 中的内部规则。
});
```

目前，getPrettierConfig 支持获取 `common` 和 `react` 规则集。

#### Commitlint 配置文件

在项目根目录下添加 commitlint.config.js 文件。

```javascript
const { getCommitlintConfig } = require("@x.render/render-lint");

module.exports = getCommitlintConfig("react", {
  // 自定义规则的优先级高于 render-lint 中的内部规则。
});
```

目前 getCommitlintConfig 支持获取 `common` 和 `react` 规则集。

## Q&A

- Q1: 我想使用 eslint 来检查用 typescript 编写的 React 项目，该如何配置呢？

  - A1: 您可以在 render-lint 配置文件中配置以下内容：

  ```javascript
  import { LintConfig } from "@x.render/render-lint";
  const lintConfig: LintConfig = {
    eslint: {
      type: "react-ts",
    },
  };
  export default lintConfig;
  ```

  然后运行`render-lint init`命令获取对应的规则集

  - A2: 您还可以在生成 eslint 配置文件时主动获取相关规则集：

  ```javascript
  const { getESLintConfig } = require("@x.render/render-lint");

  module.exports = getESLintConfig("react-ts", {
    // 自定义规则的优先级高于 render-lint 中的内部规则。
  });
  ```

  - Q2: render-lint 中内部的规则，不满足我当前的需求，我该如何使用自定义配置？
  - A1: 下面是修改 eslint 的配置的一个示例：

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

  总之你之前怎么修改 eslint、stylelint 等配置的，现在那样修改，render-lint 并没有做其他有魔法的事情。
