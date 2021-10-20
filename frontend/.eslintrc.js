module.exports = {
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
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
    'react/jsx-tag-spacing': ['error'],
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
      'parser': '@typescript-eslint/parser',
      'rules': {
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      },
    },
  ],
};
