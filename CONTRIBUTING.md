# 参与贡献

[English](./CONTRIBUTING.en.md)

感谢你愿意改进 Agent UI CSS。Issue、文档修正、新组件建议与 Pull Request 都很欢迎。

## 开始之前

- 先搜索现有 Issue，避免重复讨论。
- 大型功能或会改变公开 API 的修改，请先创建 Issue 说明使用场景。
- 仅提交你有权以 MIT 协议发布的代码与资源。
- 不要复制专有组件库、付费源码、品牌图标或其他受限资源。

## 本地开发

```bash
git clone https://github.com/zhaoxinyi02/agent-ui-css.git
cd agent-ui-css
npm install
npm run dev
```

提交前运行：

```bash
npm run check
npm run build
npm run build:site
```

## 代码约定

- 保持组件轻量，除 React 外避免增加运行时 UI 依赖。
- 公开 CSS 类名统一使用 `aui-` 前缀。
- 新增用户可见文本时提供可覆盖的属性，避免把英文写死在交互中。
- 保持语义化 HTML、键盘可操作性和适当的 ARIA 信息。
- 动画应尊重 `prefers-reduced-motion`。
- 修改公开行为时同步更新中英文 README。

## Pull Request

一个 PR 尽量只解决一个明确问题。描述中请包含：

- 修改内容与原因
- 可见行为或公开 API 的影响
- 已执行的验证命令
- 涉及界面变化时提供前后截图

提交 Pull Request 即表示你同意按本仓库的 MIT 协议发布贡献内容。
