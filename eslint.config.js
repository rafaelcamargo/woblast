import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest,
        ...globals.node
      }
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'react/jsx-no-target-blank': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      complexity: ['error', { max: 3 }],
      'max-lines': ['error', { max: 150 }],
      'max-statements': ['error', { max: 8 }, { ignoreTopLevelFunctions: true }],
      'react/prop-types': 0
    }
  },
  {
    files: ['src/**/*.test.js', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      'max-lines': ['error', { max: 1000 }],
      'max-statements': ['error', { max: 35 }, { ignoreTopLevelFunctions: true }]
    }
  }
);
