module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
  },
};
