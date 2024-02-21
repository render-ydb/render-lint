module.exports = {
    extends: [
        './rules/base/best-practices',
        './rules/base/possible-errors',
        './rules/base/style',
        './rules/base/variables',
        './rules/base/es6',
        './rules/base/strict',
        './rules/imports',
    ].map(require.resolve),
    // 确保eslint能够识别和转换新的语法语法特性
    parser: '@babel/eslint-parser',
    parserOptions: {
        // 不需要读取项目的eslint配置文件，使用默认配置
        requireConfigFile: false,
        ecmaVersion: 2020,
        // 解析位ECMAScript模块
        sourceType: 'module',
        ecmaFeatures: {
            // 不允许在全局作用域下面使用return
            globalReturn: false,
            // 严格模式下解析代码
            impliedStrict: true,
            // 允许使用JSX语法
            jsx: true,
        },
    },
    // 指定检查的根目录
    root: true,
};