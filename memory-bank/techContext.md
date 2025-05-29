# 技术背景：Distribute 组件库

**核心技术 (组件库与 CLI)：**
-   **Node.js：** 用于 CLI 工具 (`distribute-cli`) 和 `build-registry.js` 脚本。
-   **JavaScript/TypeScript：** 用于编写 CLI、构建脚本和工具函数。组件本身将是 Vue 组件。
-   **Vue.js (假定 v3)：** 组件库提供的组件将是 Vue 组件。

**CLI 工具开发：**
-   **命令行参数解析：** `commander` 或 `yargs`。
-   **文件系统操作：** `fs-extra`。
-   **交互式提示：** `inquirer`。
-   **彩色/样式化输出：** `chalk`。
-   **加载动画：** `ora`。

**注册表与配置文件：**
-   **JSON：** 用于 `registry/source.json`、构建后的注册表文件以及用户的 `components.json`。
-   **JSON Schema：** 用于定义和验证 `components.json` 和 `registry/source.json` 的结构。

**用户项目环境：**
-   **Vue.js 项目：** 主要目标。
-   **可能是 TypeScript 或 JavaScript：** CLI 和 `components.json` 应支持为任一者进行配置。
-   **Tailwind CSS (可选)：** 与 Tailwind CSS 的集成是一种常见模式（如 shadcn/ui 所示），并应可配置。
-   **路径别名：** 支持常见的路径别名设置（例如 `@/components`）。

**开发设置 (组件库本身)：**
-   标准的 Node.js 项目结构。
-   `package.json` 用于管理依赖项和定义 CLI 命令/脚本。
-   版本控制（例如 Git）。
