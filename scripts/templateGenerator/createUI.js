const fs = require("fs/promises");
const resolveRoot = require("./resolveRoot");
const {
  firstCharUpperCase,
  firstCharLowerCase,
} = require("./firstCharChangeCase");
const componentTemplate = require("./сomponentTemplate");
const styleTemplate = require("./styleTemplate");

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "ui", ...segments);

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log("Не удалось создать UI директорию", e);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);
      await fs.writeFile(
        layer !== 'shared'
          ? resolveUIPath( `${componentName}.tsx`)
          : resolveRoot("src", layer, "ui", sliceName, `${componentName}.tsx`),
        componentTemplate(componentName)
      );
      await fs.writeFile(
        layer !== 'shared'
          ? resolveUIPath( `${componentName}.module.scss`)
          : resolveRoot("src", layer, "ui", sliceName, `${componentName}.module.scss`),
        styleTemplate(firstCharLowerCase(componentName))
      );
    } catch (e) {
      console.log("Не удалось создать компонент", e);
    }
  };

  if (layer !== "shared") await createUIDir();
  await createComponent();
};

