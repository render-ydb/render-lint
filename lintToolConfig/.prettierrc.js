const getConfig = (lintType) => {
  return `const { getPrettierConfig } = require('@x.render/render-lint');
module.exports = getPrettierConfig('${lintType}', {
    // custom prettier configuration
});`;
};

module.exports = getConfig;
