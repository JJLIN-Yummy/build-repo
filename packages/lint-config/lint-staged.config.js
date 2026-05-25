export default {
  "*.{js,ts,vue}": ["eslint --fix","cspell lint --no-must-find-files"],
  "*.{vue,css,scss,less}": ["stylelint --fix"],
  "*.{js,ts,vue,css,scss,json,md}": ["prettier --write"]
};