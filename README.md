# Distribute Vue Library

一个受 shadcn/ui 启发的 Vue 组件库分发系统，通过 CLI 工具将组件和工具函数直接复制到用户项目中。

## ✨ 特性

- 🎯 **代码透明**：获得源代码而非编译包，完全可定制
- 🚀 **简单易用**：通过 CLI 命令快速添加组件
- 🔧 **灵活配置**：支持 TypeScript/JavaScript，可配置路径别名
- 📦 **无依赖包袱**：组件成为你代码库的一部分
- 🎨 **Vue 3 优化**：专为 Vue 3 设计的组件和工具函数
- 🌏 **中文友好**：完整的中文界面和文档

## 🚀 快速开始

### 安装

```bash
# 从 GitHub Packages 安装
npm install -g @cola/distribute-vue-lib --registry=https://npm.pkg.github.com

# 或者配置 .npmrc 后直接安装
echo "@cola:registry=https://npm.pkg.github.com" >> ~/.npmrc
npm install -g @cola/distribute-vue-lib
```

### 初始化项目

在你的 Vue 项目中运行：

```bash
distribute-cli init
```

这将创建一个 `components.json` 配置文件，用于指定组件的安装路径和样式偏好。

### 添加组件

```bash
# 添加 UI 组件
distribute-cli add example-button

# 添加工具函数
distribute-cli add use-example-util
```

### 查看可用组件

```bash
distribute-cli list
```

## 📖 使用示例

### 1. 初始化配置

```bash
$ distribute-cli init
? 您希望使用 TypeScript 吗? No
? 您希望使用哪种样式? default
? 配置 UI 组件的导入别名: @/components/ui
? 配置工具函数的导入别名: @/lib/utils
```

### 2. 添加组件

```bash
$ distribute-cli add example-button
正在尝试添加组件: example-button...
找到组件: Example Button
✅ 组件 'example-button' 添加完成。
```

### 3. 在 Vue 组件中使用

```vue
<template>
  <div>
    <ExampleButton @click="handleClick">
      点击我
    </ExampleButton>
  </div>
</template>

<script>
import ExampleButton from '@/components/ui/ExampleButton.vue'
import { useExampleUtil } from '@/composables'

export default {
  components: {
    ExampleButton
  },
  methods: {
    handleClick() {
      const message = useExampleUtil('Vue开发者')
      console.log(message)
    }
  }
}
</script>
```

## 📁 项目结构

```
your-vue-project/
├── src/
│   ├── components/
│   │   └── ui/              # UI 组件安装位置
│   │       └── ExampleButton.vue
│   ├── composables/         # 工具函数安装位置
│   │   └── index.js
│   └── lib/
│       └── utils/           # 工具函数安装位置
└── components.json          # Distribute 配置文件
```

## ⚙️ 配置

`components.json` 配置文件示例：

```json
{
  "$schema": "https://github.com/cola/distribute-vue-lib/blob/main/assets/schemas/components.schema.json",
  "framework": "vue",
  "style": "default",
  "typescript": false,
  "tailwind": {
    "configPath": "tailwind.config.js",
    "cssPath": "src/assets/css/tailwind.css",
    "baseColor": "slate",
    "cssVariables": false,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils",
    "composables": "@/composables"
  },
  "iconLibrary": "lucide-vue-next"
}
```

## 🎨 可用组件

### UI 组件

- `example-button` - 示例按钮组件

### 工具函数

- `use-example-util` - 示例工具函数

## 🔧 CLI 命令

| 命令 | 描述 |
|------|------|
| `distribute-cli init` | 初始化项目配置 |
| `distribute-cli add <name>` | 添加组件或工具函数 |
| `distribute-cli list` | 列出所有可用组件 |

## 🤝 贡献

欢迎贡献新的组件和工具函数！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-component`)
3. 提交更改 (`git commit -am 'Add amazing component'`)
4. 推送到分支 (`git push origin feature/amazing-component`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

本项目受到 [shadcn/ui](https://ui.shadcn.com/) 的启发，感谢其优秀的设计理念。

---

**维护者**: Cola <cola@example.com>  
**仓库**: https://github.com/cola/distribute-vue-lib 