module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:cypress/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    semi: ['error', 'always'],
    'react/prop-types': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
