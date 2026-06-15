// 导入cspell拼写检查eslint插件，用于代码英文单词拼写校验
import cspellPlugin from "@cspell/eslint-plugin";
// 集成prettier格式化插件，统一代码格式校验
import prettierPlugin from "eslint-plugin-prettier";
// typescript-eslint规则插件，提供TS专属校验规则
import tslintPlugin from "@typescript-eslint/eslint-plugin";
// typescript解析器，让eslint能识别、解析ts/tsx代码
import tsParser from "@typescript-eslint/parser";

// 导出Flat ESLint 9+标准配置，固定为数组格式，数组内每一个对象是一段独立规则集
export default [
  // ====================== 第一段：全局忽略规则（优先级最高） ======================
  {
    // ignores：全局忽略匹配的文件/目录，匹配到直接跳过所有校验，等价于旧版.eslintignore
    ignores: [
      "**/dist/**", // 所有目录下dist产物文件夹，构建输出无需校验
      "**/node_modules/**", // 所有依赖目录，第三方包不校验
      "**/.turbo/**", // turbo缓存目录，monorepo构建缓存忽略
      "**/*.d.ts", // 所有类型声明文件，类型文件不参与常规代码校验
      "**/coverage/**", // 单元测试覆盖率报告目录，无需校验
      "**/*.lock", // pnpm-lock/yarn-lock/package-lock依赖锁定文件
    ],
  },
  // ====================== 第二段：所有JS/TS通用基础规则 ======================
  {
    // files：限定本段规则只作用于下面后缀的文件
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest", // 启用最新ES语法标准，支持顶层await、装饰器等新特性
      sourceType: "module", // 代码均为ESModule规范，识别import/export，而非commonjs require
      parser: tsParser, // 指定解析器为ts解析器，同时兼容JS、TS、TSX文件
      parserOptions: {
        ecmaFeatures: { jsx: true }, // 开启JSX语法解析，适配Vue/React tsx/jsx文件
      },
      // 全局变量定义，避免eslint报未定义window/process等浏览器/Node全局对象
      globals: {
        window: true, // 浏览器全局window
        document: true, // 浏览器DOM文档对象
        navigator: true, // 浏览器设备信息对象
        process: true, // Node环境全局process
      },
    },
    // 注册插件，下方rules才能使用插件提供的校验规则
    plugins: {
      prettier: prettierPlugin, // 注册格式化插件
      "@cspell": cspellPlugin, // 注册拼写检查插件，规则前缀@cspell/
      "@typescript-eslint": tslintPlugin, // 注册ts规则插件，规则前缀@typescript-eslint/
    },
    rules: {
      // prettier格式化校验：格式不统一直接报错，强制代码格式化
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf",
        },
      ],
      // 继承ts官方推荐基础规则（无类型依赖，JS/TS均可正常运行，不会报类型缺失）
      ...tslintPlugin.configs.recommended.rules,

      // 未使用变量校验：警告级别；以下划线开头的参数/变量忽略校验
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // 禁止使用any类型：仅警告，不阻断构建，老项目兼容
      "@typescript-eslint/no-explicit-any": "warn",
      // 关闭禁止非空断言 !! 规则，开发中频繁使用，放宽限制
      "@typescript-eslint/no-non-null-assertion": "off",
      // 关闭强制函数导出显式类型，组件/工具函数过多时冗余
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // 统一类型导入写法：type import单独分离导入块，规范TS导入格式
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],

      // JS原生通用规则
      // console限制：仅允许warn/error，普通console.log警告提示清理
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // debugger调试标记：警告，提交代码需删除
      "no-debugger": "warn",
      // 禁止var声明，强制let/const块级作用域
      "no-var": "error",
      // 变量优先使用const，未重赋值则禁止let
      "prefer-const": "error",
      // 严格全等 === / !== ，禁止宽松 == / !=
      eqeqeq: ["error", "always"],

      // cspell单词拼写检查：警告级别；未指定configFile，自动向上递归查找cspell.config.js
      // 修复之前问题：根目录test.js会读取根目录配置，和命令行cspell行为完全一致
      "@cspell/spellchecker": ["warn"],
    },
  },

  // ====================== 第三段：仅TS文件启用【依赖TS类型信息】的高级规则 ======================
  {
    // 仅匹配ts/tsx/mts/cts，JS文件不会进入本段，规避JS无tsconfig导致的await-thenable报错
    files: ["**/*.{ts,mts,cts,tsx}"],
    rules: {
      // 继承TS官方带类型校验的规则集（await-thenable/no-floating-promises等强类型规则）
      // 依赖根目录eslint.config.js配置的parserOptions.project读取各包tsconfig.json提供类型
      ...tslintPlugin.configs["recommended-type-checked-only"].rules,
    },
  },

  // ====================== 第四段：单独处理纯JS文件，屏蔽TS插件专属报错 ======================
  {
    // 仅匹配原生JS文件，ts文件不受影响
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      // 关闭TS插件专属「无返回表达式」校验，JS无类型系统，该规则容易误报（比如根目录test.js）
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },

  // ====================== 第五段：所有xxx.config配置文件宽松规则，唯独vite.config强校验 ======================
  {
    // 匹配所有配置文件：eslint.config.js、cspell.config.js、turbo.config.js等
    files: ["**/*.config.{js,mjs,ts}"],
    // ignores：在当前files匹配范围内，排除vite.config文件，不应用本段宽松规则
    ignores: ["**/vite.config.{js,mjs,ts}"],
    rules: {
      // 配置文件允许require导入，关闭禁止require规则
      "@typescript-eslint/no-require-imports": "off",
      // 配置文件经常有未使用导入/变量，关闭未使用变量报错
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
