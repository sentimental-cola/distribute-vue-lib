const fs = require('fs-extra');
const path = require('path');

async function listCommand() {
  try {
    console.log('📦 正在加载组件注册表...\n');
    
    // 获取注册表文件路径
    const registryPath = path.join(__dirname, '../../dist/registry.json');
    
    // 检查注册表文件是否存在
    if (!await fs.pathExists(registryPath)) {
      console.error('❌ 错误: 找不到注册表文件。请先运行 `npm run build:registry`');
      process.exit(1);
    }
    
    // 读取注册表
    const registry = await fs.readJson(registryPath);
    
    if (!registry.items || registry.items.length === 0) {
      console.log('📭 注册表中没有可用的组件或工具函数。');
      return;
    }
    
    console.log(`🎯 ${registry.name} v${registry.version}`);
    console.log(`📚 共有 ${registry.items.length} 个可用项目:\n`);
    
    // 按类型分组
    const components = registry.items.filter(item => item.type === 'ui');
    const functions = registry.items.filter(item => item.type === 'function');
    
    // 显示UI组件
    if (components.length > 0) {
      console.log('🎨 UI 组件:');
      components.forEach(item => {
        console.log(`  • ${item.name}`);
        console.log(`    ${item.title} - ${item.description}`);
        console.log(`    标签: ${item.tags.join(', ')}`);
        console.log('');
      });
    }
    
    // 显示工具函数
    if (functions.length > 0) {
      console.log('🔧 工具函数:');
      functions.forEach(item => {
        console.log(`  • ${item.name}`);
        console.log(`    ${item.title} - ${item.description}`);
        console.log(`    标签: ${item.tags.join(', ')}`);
        console.log('');
      });
    }
    
    console.log('💡 使用方法:');
    console.log('   distribute-cli add <组件名称>');
    console.log('\n📖 示例:');
    console.log('   distribute-cli add example-button');
    console.log('   distribute-cli add use-example-util');
    
  } catch (error) {
    console.error('❌ 列出组件时发生错误:', error.message);
    process.exit(1);
  }
}

module.exports = listCommand; 