// commitlint.config.js
export default {
    // 继承官方推荐的规范（基于 Angular 规范）
    extends: ['@commitlint/config-conventional'],
    // 自定义校验规则（可选，覆盖预设规则）
    rules: {
        // 提交类型必须在指定列表中（与 cz-git 配置保持一致）
        'type-enum': [
            2, // 错误级别：2 表示不满足则报错，1 表示警告
            'always',
            [
                'feat', // 新功能
                'fix', // 修复 bug
                'docs', // 文档变更
                'style', // 代码格式（不影响逻辑）
                'refactor', // 重构（既非新功能也非修复 bug）
                'perf', // 性能优化
                'test', // 测试相关
                'build', // 构建配置/依赖变更
                'ci', // CI 配置变更
                'chore', // 其他不修改 src 或 test 的变更
                'revert' // 回滚提交
            ]
        ],
        // 提交描述（subject）不能为空
        'subject-empty': [2, 'never'],
        'scope-empty': [2, 'never'], // 永远不能为空
        // 提交描述不超过 100 个字符
        'subject-max-length': [2, 'always', 100]
    }
};