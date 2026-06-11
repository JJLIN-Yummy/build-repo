import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";
import cspellPlugin from "@cspell/eslint-plugin";
import * as path from "node:path";
// eslint-分支修改
export default [
  {
    ignores: [
      "**/eslint.config.js",
      "**/stylelint.config.js",
      "**/cspell.config.js",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
    ],
  },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        uni: "readonly",
        wx: "readonly",
      },
    },
    plugins: {
      "@cspell": cspellPlugin, // 关键：注册插件
    },
    rules: {
      "@cspell/spellchecker": [
        "error",
        {
          // ✅ 正确！官方允许的字段：configFile
          configFile: path.resolve(__dirname, "./cspell.config.js"),

          autoFix: false,
          checkComments: true,
          checkStrings: true,
          checkIdentifiers: false,
          checkJSXText: true,
          ignoreImports: true,
        },
      ],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "vue/multi-word-component-names": "off",
      // ✅ 强制加分号（关键！）
      semi: ["error", "always"],

      // ✅ 等号两边必须加空格
      "space-infix-ops": "error",

      // ✅ 缩进 2 格
      indent: ["error", 2],
    },
  },
];
