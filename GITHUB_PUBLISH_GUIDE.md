# 🐙 GitHub Packages 发布指南

本指南将帮助您将 Distribute Vue Library 发布到 GitHub Packages。

## 🎯 发布前准备

### 1. 创建 GitHub Personal Access Token

1. 访问 GitHub Settings: https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置 Token 名称，如 "distribute-vue-lib-publish"
4. 选择过期时间（建议选择较长时间或无过期）
5. 勾选以下权限：
   - ✅ `write:packages` - 上传包到 GitHub Packages
   - ✅ `read:packages` - 下载包从 GitHub Packages
   - ✅ `repo` - 访问仓库（如果是私有仓库）

6. 点击 "Generate token" 并**立即复制保存** Token

### 2. 配置环境变量

#### 方法 A: 临时设置（当前会话）

```bash
export GITHUB_TOKEN=your_github_personal_access_token
```

#### 方法 B: 永久设置（推荐）

```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
echo 'export GITHUB_TOKEN=your_github_personal_access_token' >> ~/.zshrc
source ~/.zshrc
```

#### 方法 C: 使用 .env 文件（本地开发）

```bash
# 在项目根目录创建 .env 文件
echo "GITHUB_TOKEN=your_github_personal_access_token" > .env

# 注意：确保 .env 文件在 .gitignore 中
echo ".env" >> .gitignore
```

### 3. 创建 GitHub 仓库

1. 在 GitHub 上创建新仓库：`cola/distribute-vue-lib`
2. 初始化本地 Git 仓库（如果还没有）：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/cola/distribute-vue-lib.git
git push -u origin main
```

## 🚀 发布流程

### 方法 1: 使用自动化脚本（推荐）

```bash
# 确保 GITHUB_TOKEN 已设置
echo $GITHUB_TOKEN

# 运行发布脚本
npm run publish:github
```

### 方法 2: 手动发布

```bash
# 1. 构建注册表
npm run build:registry

# 2. 登录到 GitHub Packages
npm login --scope=@cola --registry=https://npm.pkg.github.com

# 3. 发布
npm publish --registry=https://npm.pkg.github.com
```

## 📋 发布检查清单

发布前请确认：

- [ ] 已创建 GitHub Personal Access Token
- [ ] 已设置 GITHUB_TOKEN 环境变量
- [ ] 已创建 GitHub 仓库 `cola/distribute-vue-lib`
- [ ] 已推送代码到 GitHub
- [ ] package.json 中的包名为 `@cola/distribute-vue-lib`
- [ ] .npmrc 文件已正确配置
- [ ] 已构建最新的注册表文件
- [ ] 已测试 CLI 命令功能

## 🔧 常见问题

### Q: 发布时提示 401 Unauthorized

```bash
# 检查 Token 是否正确设置
echo $GITHUB_TOKEN

# 重新登录
npm login --scope=@cola --registry=https://npm.pkg.github.com
```

### Q: 发布时提示包名不符合规范

确保 package.json 中的包名格式正确：
```json
{
  "name": "@cola/distribute-vue-lib"
}
```

### Q: 无法找到仓库

确保：
1. GitHub 仓库存在且可访问
2. package.json 中的 repository 字段正确
3. 有足够的权限访问仓库

### Q: Token 权限不足

重新创建 Token 并确保勾选了：
- `write:packages`
- `read:packages`
- `repo`（如果是私有仓库）

## 📦 发布后验证

### 1. 检查 GitHub Packages 页面

访问：https://github.com/cola/distribute-vue-lib/packages

### 2. 测试安装

```bash
# 配置 npm 指向 GitHub Packages
echo "@cola:registry=https://npm.pkg.github.com" >> ~/.npmrc

# 全局安装测试
npm install -g @cola/distribute-vue-lib

# 验证 CLI 可用
distribute-cli --version
distribute-cli list
```

### 3. 在新项目中测试

```bash
# 创建测试项目
npm create vue@latest test-github-install
cd test-github-install
npm install

# 配置 GitHub Packages
echo "@cola:registry=https://npm.pkg.github.com" > .npmrc

# 测试 Distribute CLI
npx @cola/distribute-vue-lib init
npx @cola/distribute-vue-lib add example-button
```

## 🔄 更新发布

当需要发布新版本时：

```bash
# 1. 更新版本
npm run version:patch  # 或 minor/major

# 2. 提交并推送到 GitHub
git add .
git commit -m "Bump version to $(node -p "require('./package.json').version")"
git push

# 3. 发布
npm run publish:github
```

## 🎯 用户安装指南

### 为用户提供的安装说明

```bash
# 方法 1: 配置 .npmrc 后安装
echo "@cola:registry=https://npm.pkg.github.com" >> ~/.npmrc
npm install -g @cola/distribute-vue-lib

# 方法 2: 直接指定 registry
npm install -g @cola/distribute-vue-lib --registry=https://npm.pkg.github.com

# 方法 3: 在项目中使用
echo "@cola:registry=https://npm.pkg.github.com" > .npmrc
npm install @cola/distribute-vue-lib
```

## 📚 相关资源

- [GitHub Packages 文档](https://docs.github.com/en/packages)
- [npm 配置文档](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)
- [Personal Access Token 管理](https://github.com/settings/tokens)

---

**注意**: GitHub Packages 要求包名必须以 `@username` 或 `@organization` 开头。 