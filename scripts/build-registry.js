const fs = require('fs-extra');
const path = require('path');

const sourceRegistryPath = path.join(__dirname, '../registry/source.json');
const outputRegistryPath = path.join(__dirname, '../dist/registry.json');

async function buildRegistry() {
  try {
    console.log('Reading source registry from:', sourceRegistryPath);
    const sourceRegistry = await fs.readJson(sourceRegistryPath);

    // TODO: Add validation against schema assets/schemas/registry.schema.json
    // TODO: Add any necessary transformations (e.g., resolving dependencies, flattening structure)

    console.log(`Found ${sourceRegistry.items.length} items in the source registry.`);

    await fs.ensureDir(path.dirname(outputRegistryPath));
    await fs.writeJson(outputRegistryPath, sourceRegistry, { spaces: 2 });

    console.log('Successfully built registry to:', outputRegistryPath);
  } catch (error) {
    console.error('Error building registry:', error);
    process.exit(1);
  }
}

buildRegistry();
