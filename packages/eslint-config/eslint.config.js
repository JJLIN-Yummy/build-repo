import path from "node:path";
import cspellPlugin from "@cspell/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import tslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

// 删除 cspellConfigPath 相关读取代码，不再硬编码配置文件路径

export default [
  // 全局底层忽略目录
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/*.d.ts",
      "**/coverage/**",
      "**/*.lock",
    ],
  },

  // 所有 JS / TS 通用基础规则（无类型依赖，JS文件不会报错）
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
        process: true,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "@cspell": cspellPlugin,
      "@typescript-eslint": tslintPlugin,
    },
    rules: {
      "prettier/prettier": "error",

      // 仅无类型依赖基础TS规则
      ...tslintPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],

      // JS通用规则
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],

      // 移除 configFile，自动向上查找 cspell.config，和命令行表现完全一致
      "@cspell/spellchecker": ["warn"],
    },
  },

  // 仅 TS/TSX 文件启用【依赖类型信息】的规则，JS文件不会匹配到这里
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    rules: {
      ...tslintPlugin.configs["recommended-type-checked-only"].rules,
    },
  },

  // 单独处理纯JS文件，关闭TS插件专属表达式规则，解决根目录test.js报错
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },

  // 所有 *.config 配置文件宽松规则，唯独排除 vite.config 不走宽松
  {
    files: ["**/*.config.{js,mjs,ts}"],
    ignores: ["**/vite.config.{js,mjs,ts}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
