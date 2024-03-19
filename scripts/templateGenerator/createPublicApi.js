const fs = require("fs/promises");
const resolveRoot = require("./resolveRoot");
const { firstCharUpperCase } = require("./firstCharChangeCase");

module.exports = async (layer, sliceName) => {
  const path = layer === 'shared'
    ? resolveRoot("src", layer, "ui", sliceName, 'index.tsx')
    : resolveRoot("src", layer, sliceName, 'index.tsx')
  const componentName = firstCharUpperCase(sliceName);

  try {
    await fs.writeFile(
      path,
      `export { ${componentName} } from './${layer !== 'shared' ? 'ui/' : ''}${componentName}/';`
    );
  } catch (e) {
    console.log("Не удалось создать PUBLIC API");
  }
};

