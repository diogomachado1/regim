module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "airbnb-base",
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: "@typescript-eslint/parser",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'allowSyntheticDefaultImports': 0,
    'esModuleInterop': 0,
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.ts']
      }
    },
  }
};
