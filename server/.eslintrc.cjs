module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    eqeqeq: 'error',
    'prefer-const': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.test.js'],
      env: {
        node: true,
        es2022: true,
      },
      rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      },
    },
  ],
};
