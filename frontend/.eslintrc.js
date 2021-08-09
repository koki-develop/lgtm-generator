module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
  },
  'overrides': [
    {
      'files': ['*.ts', '*.tsx'],
      'extends': [
        'plugin:@typescript-eslint/recommended',
      ],
      'plugins': [
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
    },
  ],
};
