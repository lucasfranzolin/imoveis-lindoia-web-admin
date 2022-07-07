module.exports = {
    extends: [
        'next',
        'prettier',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
    ],
    plugins: ['simple-import-sort', 'import'],
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'import/default': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'prefer-const': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'space-before-function-paren': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-undef': 'error',
    },
};
