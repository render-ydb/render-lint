module.exports = {
  // 引入自定义规则集合
  extends: [
    './index',
    './rules/react',
  ].map(require.resolve),
  parserOptions: {
    babelOptions: {
      // 将JSX转为普通javaScript代码，便于进行规则检查
      presets: ['@babel/preset-react'],
    },
  },
};