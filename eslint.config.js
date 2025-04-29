import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';

export default [
  {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    env: {
      node: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    plugins: {
      import: importPlugin,
      node: nodePlugin,
      '@typescript-eslint': '@typescript-eslint/eslint-plugin',
      prettier: 'eslint-plugin-prettier',
    },
    rules: {
      'import/order': 'error',
      'node/no-unsupported-features/es-syntax': 'error',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
      'no-debugger': 'warn',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
        },
      ],
      'node/no-unsupported-features/es-syntax': [
        'error',
        {
          ignores: ['modules'],
        },
      ],
    },
  },
];
