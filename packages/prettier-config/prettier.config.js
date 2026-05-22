/**
 * @type {import('prettier').Config}
 */
export default {
    printWidth: 100, // 换行长度
    tabWidth: 2, // 缩进空格数
    useTabs: false, // 不使用制表符缩进
    semi: true, // 语句末尾加分号
    singleQuote: true, // 字符串使用单引号
    quoteProps: 'as-needed', // 对象属性名仅必要时加引号
    jsxSingleQuote: false, // JSX 中使用双引号
    trailingComma: 'es5', // 多行对象/数组最后一个元素后加逗号
    bracketSpacing: true, // 对象括号间加空格（{ foo: bar }）
    // 替换废弃的 jsxBracketSameLine
    bracketSameLine: false, // 多行标签的 > 不与内容同行（如 JSX、HTML）
    arrowParens: 'always', // 箭头函数参数必加括号（(x) => x）
    embeddedLanguageFormatting: 'auto', // 自动格式化嵌入代码
    vueIndentScriptAndStyle: true, // Vue 的 script/style 标签缩进
    endOfLine: 'lf', // 换行符用 Unix 格式（LF）
    proseWrap: 'preserve', // Markdown 保持原有换行
    htmlWhitespaceSensitivity: 'ignore' // HTML 忽略空白字符差异
    // 移除 ignorePath，无需手动指定
};