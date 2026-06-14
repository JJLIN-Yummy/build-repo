import baseConfig from "@build/eslint-config";

export default [
  // 全局忽略：先写白名单取反，再黑名单，顺序不能颠倒
  {
    ignores: [
      // 保留 vite-config、utils、babel
      "!packages/vite-config/**",
      "!packages/utils/**",
      "!packages/babel/**",
      // 其余 *-config 包整体忽略
      "packages/*-config/**",
      "node_modules/**",
    ],
  },

  // 继承公共eslint规则
  ...baseConfig,

  // 全局统一给所有packages下深层TS文件注入tsconfig类型信息
  {
    files: ["packages/**/**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parserOptions: {
        project: ["./packages/*/tsconfig.json"],
      },
    },
  },
];
