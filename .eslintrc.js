module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-console': 'off',
    'semi': [2, "always"],
    "indent": ["error", 2],
    'object-curly-spacing': ["error", "always"]
  }
};
