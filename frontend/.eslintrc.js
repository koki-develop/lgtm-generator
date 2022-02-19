module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import', 'unused-imports'],
  rules: {
    'react/prop-types': 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'react/jsx-tag-spacing': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '@/components/App/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/Layout/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/pages/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/providers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/model/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          { pattern: '@/lib/**', group: 'internal', position: 'before' },
          { pattern: '@/recoil/**', group: 'internal', position: 'before' },
          { pattern: '@/types/**', group: 'internal', position: 'before' },
          { pattern: '@/locales/**', group: 'internal', position: 'before' },
          { pattern: '@/routes', group: 'internal', position: 'before' },
          { pattern: '@/styles/**', group: 'internal', position: 'before' },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './',
          },
        },
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
  ],
};
