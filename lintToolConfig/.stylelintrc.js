const getConfig = (lintType) => {
    return `const { getStylelintConfig } = require('@x.render/render-lint');
module.exports = getStylelintConfig('${lintType}', {
    // custom stylelint configuration
});`
}

module.exports =  getConfig;