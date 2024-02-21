module.exports = {
  extends: [require.resolve("../eslint-config-render")],
  rules: {
    semi: "warn",
    "eol-last": "warn",
    "quote-props": "warn",
    "no-unused-vars": "warn",
    "dot-notation": "off",
  },
};
