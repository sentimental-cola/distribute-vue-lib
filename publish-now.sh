#!/bin/bash

echo "🚀 Distribute Vue Library 发布脚本"
echo "=================================="

# 检查是否提供了 Token
if [ -z "$1" ]; then
    echo "❌ 错误: 请提供 GitHub Personal Access Token"
    echo ""
    echo "使用方法:"
    echo "  ./publish-now.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "🔗 创建 Token: https://github.com/settings/tokens"
    echo "需要权限: write:packages, read:packages, repo"
    exit 1
fi

# 设置环境变量
export GITHUB_TOKEN=$1

echo "🔑 GitHub Token 已设置"
echo "📦 开始发布到 GitHub Packages..."

# 构建注册表
echo "🔨 构建注册表..."
npm run build:registry

# 发布
echo "🚀 发布包..."
npm publish --registry=https://npm.pkg.github.com

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 发布成功！"
    echo ""
    echo "📖 安装命令:"
    echo "   npm install -g @sentimental-cola/distribute-vue-lib --registry=https://npm.pkg.github.com"
    echo ""
    echo "🔗 GitHub Packages 页面:"
    echo "   https://github.com/sentimental-cola/distribute-vue-lib/packages"
else
    echo ""
    echo "❌ 发布失败，请检查 Token 权限和网络连接"
fi 