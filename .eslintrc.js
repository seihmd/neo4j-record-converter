module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
  },
  overrides: [
    {
      files: ['test/**/*.test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
