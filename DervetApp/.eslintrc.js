module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    __static: true,
  },
  settings: {
    'html/html-extensions': ['.html', '.vue'],
  },
  plugins: [
    'html',
    'vue',
    '@typescript-eslint/eslint-plugin',
  ],
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'arrow-parens': 0,
    'class-methods-use-this': 0,
    'global-require': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'max-classes-per-file': 0, // Remove--this is a good rule to enforce
    'no-multi-assign': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'object-curly-newline': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
