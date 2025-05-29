const fs = require('fs-extra');
const path = require('path');
// inquirer will be imported dynamically

const componentsJsonPath = path.join(process.cwd(), 'components.json');
const defaultSchemaPath = "../../assets/schemas/components.schema.json"; // Placeholder for dev

async function init() {
  const inquirer = (await import('inquirer')).default; // Dynamic import
  console.log('正在初始化项目配置...');

  try {
    if (await fs.pathExists(componentsJsonPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'components.json 文件已存在。是否覆盖?',
          default: false,
        },
      ]);
      if (!overwrite) {
        console.log('初始化已取消。');
        return;
      }
    }

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'typescript',
        message: '您希望使用 TypeScript 吗?',
        default: true,
      },
      {
        type: 'input',
        name: 'style',
        message: '您希望使用哪种样式?',
        default: 'default',
      },
      {
        type: 'input',
        name: 'tailwind_configPath',
        message: '您的 tailwind.config.js (或 .ts) 文件位于何处?',
        default: 'tailwind.config.js',
      },
      {
        type: 'input',
        name: 'tailwind_cssPath',
        message: '您的 Tailwind 全局 CSS 文件位于何处?',
        default: 'src/assets/css/tailwind.css',
      },
      {
        type: 'list',
        name: 'tailwind_baseColor',
        message: '您希望使用哪种颜色作为 Tailwind 的基础色?',
        choices: ['slate', 'gray', 'zinc', 'neutral', 'stone'],
        default: 'slate',
      },
      {
        type: 'confirm',
        name: 'tailwind_cssVariables',
        message: '您希望为 Tailwind 主题使用 CSS 变量吗?',
        default: true,
      },
      {
        type: 'input',
        name: 'tailwind_prefix',
        message: '请输入 Tailwind 工具类的前缀 (可选):',
        default: '',
      },
      {
        type: 'input',
        name: 'aliases_components',
        message: '配置 UI 组件的导入别名:',
        default: '@/components/ui',
      },
      {
        type: 'input',
        name: 'aliases_utils',
        message: '配置工具函数的导入别名:',
        default: '@/lib/utils',
      },
      {
        type: 'input',
        name: 'aliases_composables',
        message: '配置 Composable 函数的导入别名:',
        default: '@/composables',
      },
      {
        type: 'input',
        name: 'iconLibrary',
        message: '请输入您偏好的图标库 (例如 lucide-vue-next, 可选):',
        default: 'lucide-vue-next',
      },
    ]);

    const componentsConfig = {
      "$schema": defaultSchemaPath,
      "framework": "vue",
      "style": answers.style,
      "typescript": answers.typescript,
      "tailwind": {
        "configPath": answers.tailwind_configPath,
        "cssPath": answers.tailwind_cssPath,
        "baseColor": answers.tailwind_baseColor,
        "cssVariables": answers.tailwind_cssVariables,
        "prefix": answers.tailwind_prefix,
      },
      "aliases": {
        "components": answers.aliases_components,
        "utils": answers.aliases_utils,
        "composables": answers.aliases_composables,
      },
      "iconLibrary": answers.iconLibrary || "", // Ensure it's a string, even if empty
    };

    await fs.writeJson(componentsJsonPath, componentsConfig, { spaces: 2 });
    console.log(`已成功在 ${componentsJsonPath} 创建/更新 components.json`);
    console.log('如有需要，请检查 components.json。');

  } catch (error) {
    if (error.isTtyError) {
      console.error('错误：提示渲染失败。您的环境可能不受支持。');
    } else {
      console.error('初始化项目时出错：', error);
    }
    process.exit(1);
  }
}

module.exports = init;
