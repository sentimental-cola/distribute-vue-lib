# 🚀 GitHub Packages 快速开始

## 📋 发布前检查清单

在发布之前，请确保完成以下步骤：

### ✅ 1. GitHub 准备
- [ ] 创建 GitHub 仓库：`cola/distribute-vue-lib`
- [ ] 获取 GitHub Personal Access Token（需要 `write:packages` 权限）
- [ ] 设置环境变量：`export GITHUB_TOKEN=your_token`

### ✅ 2. 代码准备
- [ ] 所有代码已提交到 Git
- [ ] package.json 中包名为 `@cola/distribute-vue-lib`
- [ ] .npmrc 文件已配置
- [ ] 注册表已构建（`npm run build:registry`）

## 🎯 3 步发布流程

### 步骤 1: 设置 GitHub Token

```bash
# 创建 GitHub Personal Access Token
# 访问: https://github.com/settings/tokens
# 权限: write:packages, read:packages, repo

# 设置环境变量
export GITHUB_TOKEN=your_github_personal_access_token

# 验证设置
echo $GITHUB_TOKEN
```

### 步骤 2: 初始化 Git 仓库（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: Distribute Vue Library"
git branch -M main
git remote add origin https://github.com/cola/distribute-vue-lib.git
git push -u origin main
```

### 步骤 3: 发布到 GitHub Packages

```bash
# 使用自动化脚本发布
npm run publish:github
```

## 🎉 发布成功后

### 验证发布

1. **检查 GitHub Packages 页面**
   - 访问：https://github.com/cola/distribute-vue-lib/packages

2. **测试安装**
   ```bash
   # 配置 npm
   echo "@cola:registry=https://npm.pkg.github.com" >> ~/.npmrc
   
   # 全局安装
   npm install -g @cola/distribute-vue-lib
   
   # 测试 CLI
   distribute-cli --version
   distribute-cli list
   ```

### 用户安装指南

为用户提供以下安装说明：

```bash
# 方法 1: 配置后安装
echo "@cola:registry=https://npm.pkg.github.com" >> ~/.npmrc
npm install -g @cola/distribute-vue-lib

# 方法 2: 直接指定 registry
npm install -g @cola/distribute-vue-lib --registry=https://npm.pkg.github.com
```

## 🔄 后续更新

当需要发布新版本时：

```bash
# 1. 更新版本
npm run version:patch  # 0.1.0 -> 0.1.1

# 2. 提交更改
git add .
git commit -m "Bump version to $(node -p "require('./package.json').version")"
git push

# 3. 发布新版本
npm run publish:github
```

## 🆘 遇到问题？

### 常见错误解决

1. **401 Unauthorized**
   ```bash
   # 检查 Token
   echo $GITHUB_TOKEN
   
   # 重新登录
   npm login --scope=@cola --registry=https://npm.pkg.github.com
   ```

2. **包名格式错误**
   - 确保 package.json 中包名为 `@cola/distribute-vue-lib`

3. **仓库不存在**
   - 确保 GitHub 仓库 `cola/distribute-vue-lib` 已创建

4. **权限不足**
   - 重新创建 Token，确保勾选 `write:packages` 权限

---

**需要帮助？** 查看详细指南：[GITHUB_PUBLISH_GUIDE.md](./GITHUB_PUBLISH_GUIDE.md) 