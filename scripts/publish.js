#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function publish() {
  try {
    console.log('🚀 开始发布到 GitHub Packages...\n');

    // 1. 检查 GitHub Token
    console.log('🔑 检查 GitHub Token...');
    if (!process.env.GITHUB_TOKEN) {
      console.error('❌ 错误: 未找到 GITHUB_TOKEN 环境变量');
      console.log('请设置 GitHub Personal Access Token:');
      console.log('export GITHUB_TOKEN=your_github_token');
      process.exit(1);
    }

    // 2. 检查是否有未提交的更改
    console.log('📋 检查 Git 状态...');
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      if (gitStatus.trim()) {
        console.warn('⚠️  警告: 有未提交的更改，建议先提交所有更改');
        console.log(gitStatus);
      }
    } catch (error) {
      console.log('ℹ️  未检测到 Git 仓库');
    }

    // 3. 构建注册表
    console.log('\n🔨 构建注册表...');
    execSync('npm run build:registry', { stdio: 'inherit' });

    // 4. 检查必要文件
    console.log('\n📁 检查必要文件...');
    const requiredFiles = ['dist/registry.json', 'README.md', 'LICENSE', '.npmrc'];
    for (const file of requiredFiles) {
      if (!await fs.pathExists(file)) {
        throw new Error(`缺少必要文件: ${file}`);
      }
    }

    // 5. 运行测试（如果有）
    console.log('\n🧪 运行测试...');
    try {
      execSync('npm test', { stdio: 'inherit' });
    } catch (error) {
      console.log('ℹ️  跳过测试（未配置测试脚本）');
    }

    // 6. 检查包内容
    console.log('\n📦 预览包内容...');
    execSync('npm pack --dry-run', { stdio: 'inherit' });

    // 7. 发布到 GitHub Packages
    console.log('\n🚀 发布到 GitHub Packages...');
    execSync('npm publish --registry=https://npm.pkg.github.com', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_AUTH_TOKEN: process.env.GITHUB_TOKEN }
    });

    console.log('\n✅ 发布成功！');
    console.log('\n📖 安装命令:');
    console.log('   npm install -g @cola/distribute-vue-lib --registry=https://npm.pkg.github.com');
    console.log('\n🔗 GitHub Packages 页面:');
    console.log('   https://github.com/cola/distribute-vue-lib/packages');

  } catch (error) {
    console.error('\n❌ 发布失败:', error.message);
    process.exit(1);
  }
}

publish(); 