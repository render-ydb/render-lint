const getConfig = (lintType) => {
return `const { getCommitlintConfig } = require('@x.render/render-lint');
module.exports = getCommitlintConfig('${lintType}', {
    // custom commitlint configuration
});`
}

module.exports =  getConfig;