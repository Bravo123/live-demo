// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    indent: 0,
    'no-tabs': 0,
    'space-before-function-paren': 0,
    semi: [2, 'always'],
    'eol-last': 0,
    'no-console': 0,
    'prettier/prettier': 2,
  },
  globals: {
    WeixinJSBridge: true,
    wx: true,
    ROP: true,
    md5: true,
  },
};
