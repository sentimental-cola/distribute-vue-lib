const fs = require('fs-extra');
const path = require('path');

const distRegistryPath = path.join(__dirname, '../../dist/registry.json');
const userComponentsConfigPath = path.join(process.cwd(), 'components.json'); // User's project CWD

async function addComponent(componentName) {
  console.log(`正在尝试添加组件: ${componentName}...`);

  try {
    // 1. Load the built registry
    if (!await fs.pathExists(distRegistryPath)) {
      console.error(`错误：在 ${distRegistryPath} 未找到构建的注册表。请运行 'npm run build:registry'。`);
      process.exit(1);
    }
    const registry = await fs.readJson(distRegistryPath);

    // 2. Find the component in the registry
    const item = registry.items.find(i => i.name === componentName);

    if (!item) {
      console.error(`错误：在注册表中未找到组件 '${componentName}'。`);
      console.log(`可用条目: ${registry.items.map(i => i.name).join(', ')}`);
      process.exit(1);
    }

    console.log(`找到组件: ${item.title}`);
    console.log(`描述: ${item.description}`);
    console.log(`类型: ${item.type}`);

    // 3. Load user's components.json
    let userConfig;
    if (await fs.pathExists(userComponentsConfigPath)) {
      userConfig = await fs.readJson(userComponentsConfigPath);
    } else {
      console.error(`错误：在 ${process.cwd()} 未找到 components.json。请先运行 'distribute-cli init'。`);
      process.exit(1);
    }
    
    // 4. Copy files
    console.log('正在复制文件:');
    for (const fileInfo of item.files) {
      const sourcePath = path.join(__dirname, '../../', fileInfo.path); // Path relative to project root

      if (!await fs.pathExists(sourcePath)) {
        console.error(`错误：源文件未找到: ${sourcePath}`);
        continue; // Skip this file
      }

      let baseTargetDir;
      // Determine base target directory from aliases based on item type and file type
      if (fileInfo.targetPath) { // Explicit targetPath in registry takes precedence
        // Resolve alias if targetPath starts with @/ or similar
        // For simplicity, assuming targetPath is relative to project root or uses an alias directly
        // This part needs more robust alias resolution logic for production
        if (fileInfo.targetPath.startsWith('@/')) {
            const aliasKey = fileInfo.targetPath.split('/')[1]; // e.g. components from @/components/specific
            if (userConfig.aliases[aliasKey]) {
                baseTargetDir = fileInfo.targetPath.replace(`@/${aliasKey}`, userConfig.aliases[aliasKey]);
            } else {
                 baseTargetDir = fileInfo.targetPath; // Fallback if alias not perfectly matched
            }
        } else {
            baseTargetDir = fileInfo.targetPath; // Assumed to be relative to CWD or absolute
        }
      } else if (item.type === 'ui' && fileInfo.fileType === 'component') {
        baseTargetDir = userConfig.aliases.components;
      } else if (item.type === 'function' && fileInfo.fileType === 'script') {
        if (item.name.startsWith('use')) { // Heuristic for composables
          baseTargetDir = userConfig.aliases.composables || userConfig.aliases.utils;
        } else {
          baseTargetDir = userConfig.aliases.utils;
        }
      } else {
        console.warn(`警告：无法确定文件 '${fileInfo.path}' 的目标目录，将跳过。`);
        continue;
      }
      
      // Resolve @ alias in baseTargetDir
      if (baseTargetDir.startsWith('@/')) {
        // Simplified alias resolution: assumes '@/' maps to 'src/' relative to cwd()
        // A more robust solution would parse tsconfig/jsconfig or use a resolver library
        baseTargetDir = baseTargetDir.replace('@/', 'src/');
      }

      const targetFilePath = path.join(process.cwd(), baseTargetDir, path.basename(fileInfo.path));
      
      console.log(`  - 源文件: ${sourcePath}`);
      console.log(`  - 目标路径: ${targetFilePath}`);
      
      await fs.ensureDir(path.dirname(targetFilePath));
      await fs.copy(sourcePath, targetFilePath, { overwrite: true }); // Overwrite for simplicity, could prompt
      console.log(`    已将 ${path.basename(fileInfo.path)} 复制到 ${targetFilePath}`);
    }

    // 5. Handle NPM dependencies
    if (item.dependencies && item.dependencies.length > 0) {
      console.log(`\n提示：此组件/功能依赖以下 NPM 包:`);
      item.dependencies.forEach(dep => console.log(`  - ${dep}`));
      console.log(`请使用 'npm install ${item.dependencies.join(' ')}' 或 'yarn add ${item.dependencies.join(' ')}' 手动安装它们。`);
    }

    // 6. Handle registry dependencies (simulation for now)
    if (item.registryDependencies && item.registryDependencies.length > 0) {
      console.log(`\n提示：此组件/功能还依赖库内其他组件/功能:`);
      item.registryDependencies.forEach(dep => console.log(`  - ${dep}`));
      console.log(`(在未来的版本中，CLI可能会尝试自动递归安装这些内部依赖)`);
    }

    console.log(`\n组件 '${componentName}' 添加完成。`);

  } catch (error) {
    console.error(`添加组件 '${componentName}' 时出错：`, error);
    process.exit(1);
  }
}

module.exports = addComponent;
