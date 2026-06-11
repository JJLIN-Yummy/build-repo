import cspell from "@build/cspell-config";
export default {
  ...cspell,
  ignorePaths: [...cspell.ignorePaths, "*.config.js"],
};
