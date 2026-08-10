<div align="center">

# Agent UI CSS

为 AI 与智能体产品打造的精致 React 界面组件库。

[在线演示](https://au.lansuan.cc/) · [English](./README.en.md) · [组件列表](#组件) · [参与贡献](./CONTRIBUTING.md)

[![CI](https://github.com/zhaoxinyi02/agent-ui-css/actions/workflows/ci.yml/badge.svg)](https://github.com/zhaoxinyi02/agent-ui-css/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-18181b.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-%3E%3D18-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

![Agent UI CSS 中文界面预览](./docs/assets/preview.jpg)

## 简介

Agent UI CSS 提供一组原创、轻量、可组合的 React 组件，用于构建会思考、会调用工具、会流式输出并能继续接收用户输入的 AI 产品界面。

- 14 个面向 AI/Agent 场景的界面组件
- 13 个原创 SVG 图标
- TypeScript 类型完整
- 除 React 外无运行时 UI 依赖
- 使用原生 CSS 与 `aui-` 类名前缀，方便覆盖和组合
- 内置可访问性语义与减少动画支持
- 支持文本属性本地化与自动深色主题

> [!NOTE]
> 这是一个独立开源项目，与 AICSS 不存在从属、背书或官方合作关系。仓库代码与图标均为原创实现，不包含 AICSS 的付费源码、品牌标识或专有资源。

## 快速开始

### 安装

项目发布到 npm 前，可以直接从 GitHub 安装：

```bash
npm install github:zhaoxinyi02/agent-ui-css#v0.1.0
```

React 18 及以上版本为 peer dependency。

### 使用组件

```tsx
import { AgentInput, ThinkingReasoning } from "agent-ui-css";
import "agent-ui-css/styles.css";

export function AgentPanel() {
  return (
    <div className="aui-auto-theme">
      <ThinkingReasoning seconds={6}>
        <p>正在理解需求并检查相关资料。</p>
      </ThinkingReasoning>

      <AgentInput
        placeholder="向智能体提问…"
        models={["快速", "均衡", "深度"]}
        onSubmit={(value, model) => console.log({ value, model })}
      />
    </div>
  );
}
```

## 组件

| 分类 | 组件 | 适用场景 |
| --- | --- | --- |
| 思考与状态 | `ThinkingState`、`ThinkingReasoning`、`Orbs` | 思考、推理展开面板、运行状态 |
| 工具与操作 | `WebSearch`、`FileDiff`、`ImageGeneration` | 搜索进度、代码差异、图片生成 |
| 文本输出 | `TextResponse`、`StreamingText`、`CitationMark`、`InlineCitations`、`CodeBlock` | 回答、流式文本、引用、代码 |
| 结构化输出 | `TaskList`、`DataTable`、`ComparisonTable` | 任务进度、数据、方案对比 |
| 用户输入 | `AgentInput` | 提示词、模型选择与提交 |
| 基础能力 | `Icon` | 13 个一致风格的 SVG 图标 |

完整交互与全部状态请查看[在线演示](https://au.lansuan.cc/)。所有组件和相关 TypeScript 类型均从包根路径导出。

## 主题定制

在应用根节点覆盖 CSS 变量即可建立自己的视觉主题：

```css
.my-agent-app {
  --aui-bg: #ffffff;
  --aui-surface: #f7f7f8;
  --aui-text: #18181b;
  --aui-muted: #71717a;
  --aui-border: #e4e4e7;
  --aui-accent: #6d5efc;
  --aui-accent-soft: #eeecff;
  --aui-success: #16865c;
  --aui-danger: #d24242;
  --aui-radius: 14px;
  --aui-font: Inter, sans-serif;
}
```

给容器添加 `.aui-auto-theme` 后，组件会根据系统 `prefers-color-scheme` 自动应用内置深色变量。演示站还支持中英文与浅色/深色偏好持久保存：首次访问跟随系统设置，手动切换后优先使用保存值。

组件中的用户可见文本均可通过属性传入，例如 `thinkingLabel`、`copyLabel`、`placeholder` 和 `sendLabel`，便于接入任意国际化方案。

## 本地开发

```bash
git clone https://github.com/zhaoxinyi02/agent-ui-css.git
cd agent-ui-css
npm install
npm run dev
```

常用命令：

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动本地演示站 |
| `npm run check` | 运行 TypeScript 检查 |
| `npm run build` | 构建组件库与类型声明 |
| `npm run build:site` | 构建可部署演示站到 `site-dist/` |

## 项目结构

```text
src/lib/components.tsx  组件、图标与公开类型
src/lib/styles.css      组件样式与主题变量
src/App.tsx             在线演示与中英文内容
src/demo.css            演示站布局样式
```

## 社区与许可

- 提交代码前请阅读[贡献指南](./CONTRIBUTING.md)
- 社区互动遵循[行为准则](./CODE_OF_CONDUCT.md)
- 安全问题请参阅[安全策略](./SECURITY.md)
- 版本变化记录在 [CHANGELOG](./CHANGELOG.md)
- 项目采用 [MIT License](./LICENSE)

欢迎提交 Issue、功能建议与 Pull Request。如果这个项目对你有帮助，也欢迎点一个 Star。
