const createTemplate = require("./createTemplate");

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = [
  "shared",
  "entities",
  "features",
  "widgets",
  "pages",
  "fullpages",
];

if (!layer || !layers.includes(layer))
  throw new Error(`Необходимо указать слой. ${layers.join("или")}`);

if (!sliceName) throw new Error("Необходимо указать название слайса");

createTemplate(layer, sliceName);

