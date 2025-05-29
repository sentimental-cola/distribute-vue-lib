# 📦 Distribute Vue Library 发布指南

本指南将帮助您将 Distribute Vue Library 发布到私有 npm 仓库。

## 🎯 发布前准备

### 1. 配置私有 npm 仓库

#### 选项 A: 使用 npm 私有仓库

```bash
# 登录到 npm（如果使用 npm 官方私有仓库）
npm login

# 或者配置私有仓库
npm config set registry https://your-private-npm-registry.com
npm login --registry=https://your-private-npm-registry.com
```

#### 选项 B: 使用 Verdaccio（本地私有仓库）

```bash
# 安装 Verdaccio
npm install -g verdaccio

# 启动 Verdaccio
verdaccio

# 配置 npm 指向本地仓库
npm config set registry http://localhost:4873

# 创建用户
npm adduser --registry http://localhost:4873
```

#### 选项 C: 使用 GitHub Packages

```bash
# 配置 .npmrc 文件
echo "@your-org:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc

# 或者在项目根目录创建 .npmrc
echo "@your-org:registry=https://npm.pkg.github.com" > .npmrc
```

### 2. 更新配置信息

在发布前，请更新以下文件中的占位符：

#### package.json
```json
{
  "name": "@your-org/distribute-vue-lib",  // 替换 your-org
  "author": "Your Name <your.email@example.com>",  // 替换个人信息
  "repository": {
    "url": "git+https://github.com/your-org/distribute-vue-lib.git"  // 替换仓库地址
  },
  "publishConfig": {
    "registry": "https://your-private-npm-registry.com"  // 替换私有仓库地址
  }
}
```

#### README.md
- 替换所有 `@your-org` 为实际的组织名
- 更新安装命令中的包名
- 更新仓库链接和联系信息

### 3. 版本管理

```bash
# 补丁版本（bug 修复）
npm run version:patch    # 0.1.0 -> 0.1.1

# 次要版本（新功能）
npm run version:minor    # 0.1.0 -> 0.2.0

# 主要版本（破坏性更改）
npm run version:major    # 0.1.0 -> 1.0.0
```

## 🚀 发布流程

### 方法 1: 使用自动化脚本（推荐）

```bash
# 运行自动化发布脚本
npm run publish:private
```

这个脚本会自动：
1. 检查 Git 状态
2. 构建注册表
3. 检查必要文件
4. 运行测试
5. 预览包内容
6. 发布到私有 npm

### 方法 2: 手动发布

```bash
# 1. 构建注册表
npm run build:registry

# 2. 检查包内容
npm pack --dry-run

# 3. 发布
npm publish
```

## 📋 发布检查清单

发布前请确认：

- [ ] 已更新版本号
- [ ] 已更新 CHANGELOG.md（如果有）
- [ ] 已测试 CLI 命令功能
- [ ] 已构建最新的注册表文件
- [ ] 已配置正确的私有 npm 仓库
- [ ] package.json 中的信息已更新
- [ ] README.md 中的示例和链接已更新
- [ ] 已提交所有代码更改

## 🔧 常见问题

### Q: 发布时提示权限错误

```bash
# 检查登录状态
npm whoami

# 重新登录
npm login --registry=https://your-private-npm-registry.com
```

### Q: 包名冲突

确保 package.json 中的包名是唯一的：
```json
{
  "name": "@your-org/distribute-vue-lib"
}
```

### Q: 发布到错误的仓库

检查 npm 配置：
```bash
# 查看当前配置
npm config get registry

# 设置正确的仓库
npm config set registry https://your-private-npm-registry.com
```

### Q: 构建失败

确保所有依赖已安装：
```bash
npm install
npm run build:registry
```

## 📦 发布后验证

### 1. 验证包是否发布成功

```bash
# 搜索包
npm search @your-org/distribute-vue-lib --registry=https://your-private-npm-registry.com

# 查看包信息
npm view @your-org/distribute-vue-lib --registry=https://your-private-npm-registry.com
```

### 2. 测试安装

```bash
# 全局安装测试
npm install -g @your-org/distribute-vue-lib --registry=https://your-private-npm-registry.com

# 验证 CLI 可用
distribute-cli --version
distribute-cli list
```

### 3. 在新项目中测试

```bash
# 创建测试项目
npm create vue@latest test-install
cd test-install
npm install

# 测试 Distribute CLI
distribute-cli init
distribute-cli add example-button
```

## 🔄 更新发布

当需要发布新版本时：

```bash
# 1. 更新版本
npm run version:patch  # 或 minor/major

# 2. 发布
npm run publish:private
```

## 📚 相关资源

- [npm 私有包文档](https://docs.npmjs.com/about-private-packages)
- [Verdaccio 文档](https://verdaccio.org/)
- [GitHub Packages 文档](https://docs.github.com/en/packages)
- [npm 发布最佳实践](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

**注意**: 请根据您的实际私有 npm 仓库配置调整相关设置。 