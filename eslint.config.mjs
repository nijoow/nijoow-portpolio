import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';

/**
 * ESLint Flat Config (ESLint v9+).
 * AGENTS.md 완료 기준: next/core-web-vitals + @typescript-eslint, no-explicit-any: error.
 * eslint-config-next/core-web-vitals 에 typescript-eslint·import·jsx-a11y 플러그인이 포함되어 있다.
 */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'public/**'],
  },
  ...nextCoreWebVitals,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
    },
  },
];

export default config;
