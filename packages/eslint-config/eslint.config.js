import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
    js.configs.recommended,
    ...vue.configs['flat/recommended'],
    prettier,
    {
        files: ['**/*.{js,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                uni: 'readonly',
                wx: 'readonly'
            }
        },
        rules: {
            "no-var": "error",
            "prefer-const": "error",
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "vue/multi-word-component-names": "off"
        }
    }
]