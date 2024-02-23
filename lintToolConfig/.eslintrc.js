const getConfig = (lintType) => {
  return `const { getESLintConfig } = require('@x.render/render-lint');
module.exports = getESLintConfig('${lintType}', {
    // custom eslint configuration
});`;
};

module.exports = getConfig;
