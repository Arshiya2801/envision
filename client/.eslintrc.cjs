module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'no-console': ['error', { allow: ['error'] }],
    eqeqeq: 'error',
    'prefer-const': 'error',
    'react-refresh/only-export-components': 'warn',
  },
};
