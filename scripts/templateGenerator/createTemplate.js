const fs = require("fs/promises");
const resolveRoot = require("./resolveRoot");
const createPublicApi = require("./createPublicApi");
const createUI = require("./createUI");
const { firstCharUpperCase } = require("./firstCharChangeCase");

module.exports = async (layer, sliceName) => {
  const path = layer === 'shared'
    ? resolveRoot("src", layer, "ui", firstCharUpperCase(sliceName))
    : resolveRoot("src", layer, firstCharUpperCase(sliceName))
  try {
    await fs.mkdir(path);
  } catch (e) {
    console.log(e);
  }

  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};

