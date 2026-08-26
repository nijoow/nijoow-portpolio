import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

const config = [
  {
    ignores: [
      '.next/**',
      '.vercel/**',
      'out/**',
      'node_modules/**',
      'public/**',
    ],
  },
  ...nextCoreWebVitals,
  sonarjs.configs.recommended,
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
      complexity: ['warn', 15],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3],
      'max-params': ['warn', 4],
    },
  },
];

export default config;
