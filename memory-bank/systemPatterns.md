# 系统模式：Distribute 组件库

**整体架构：**
-   **组件库核心：** 包含 Vue 组件和 JS/TS 工具函数的源代码。
-   **注册表系统：**
    -   `registry/source.json`：一个人工可编辑的 JSON 文件，定义所有可用的组件/函数、它们的源文件、类型、依赖关系（内部和对等依赖），以及任何特定的目标路径。
    -   `scripts/build-registry.js`：一个构建脚本，处理 `source.json` 并将其转换为 CLI 可用的格式（例如 `dist/registry/main.json`）。CLI 使用这个构建好的注册表。
-   **CLI 工具 (`distribute-cli`)：**
    -   `init` 命令：在用户项目中交互式地创建/更新 `components.json`。
    -   `add <name>` 命令：读取构建好的注册表，解析依赖，并根据 `components.json` 的设置将组件/函数的源文件复制到用户项目中。
    -   `list` 命令：列出构建好的注册表中的可用组件/函数。
-   **用户项目集成：**
    -   `components.json`：用户项目中的配置文件，指导 CLI 的行为（路径、别名、TS/JS 偏好等）。
    -   复制的源代码：组件和函数成为用户代码库的一部分。

**关键设计模式 (受 shadcn/ui 启发)：**
-   **代码优于配置 (针对组件)：** 组件以源代码形式交付，而非不透明的依赖项，以促进定制。
-   **CLI 作为代码生成器/复制器：** CLI 负责代码的传输和配置。
-   **集中式注册表：** 可用组件及其元数据的单一事实来源。
-   **配置文件驱动：** 用户特定设置在 `components.json` 中管理。
-   **依赖管理：** 系统处理内部（库到库）和对等（外部 npm）依赖。

**数据流 (`add` 命令)：**
1.  用户运行 `distribute-cli add button`。
2.  CLI 读取用户项目中的 `components.json`。
3.  CLI 加载构建好的注册表（例如 `dist/registry/main.json`）。
4.  CLI 在注册表中查找 "button" 的元数据。
5.  CLI 解析 `registryDependencies`（如果需要，递归调用 `add`）并检查 `peerDependencies`。
6.  CLI 将 "button" 元数据中列出的文件从组件库的源复制到用户项目中，同时遵守 `components.json` 中的路径和任何 `targetPath` 覆盖设置。
