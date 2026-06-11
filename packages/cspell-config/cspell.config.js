export default {
  language: "en,zh-CN",
  ignorePaths: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "pnpm-lock.yaml",
    "*.log",
    // "*.config.js",
  ],
  words: [
    // 你可以在这里加项目专属单词，不会报错
    "monorepo",
    "eslint",
    "commitlint",
    "husky",
    "cspell",
    "pnpm",
  ],

  dictionaryDefinitions: [
    // 白名单
    {
      name: "allowed-words",
      path: ".cspell/allowed.txt",
      addWords: true,
    },
  ],

  dictionaries: ["allowed-words"],
  flagWords: ["fuck"], // 这些词会直接报错
  minWordLength: 1,
};
