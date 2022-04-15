// Utils
const transformMetaImports = require('../utils/transformMetaImports');
const transformProperties = require('../utils/transformProperties');
const getMergingMetadataCode = require('../utils/getMergingMetadataCode');

/**
 * 
 * @param {string} [source] Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
function metaLoader (source, map, meta) {

  let index = 0;
  let transformedSourceStringArr = [];

  const { metaImports, parsedIndex: metaImportsIndex, varNames } = transformMetaImports({
    source,
    index,
    resourcePath: this.resourcePath,
    rootDir: this.context
  });
  transformedSourceStringArr.push(metaImports);
  index = metaImportsIndex;

  const { properties, parsedIndex: propertiesIndex, propsVarName } = transformProperties({
    source,
    index
  })
  transformedSourceStringArr.push(properties);
  index = propertiesIndex;
  
  const { code, mergedMetadataVarName } = getMergingMetadataCode([
    ...varNames,
    propsVarName
  ]);
  transformedSourceStringArr.push(code);

  transformedSourceStringArr.push(
    `export default ${mergedMetadataVarName}`
  );

  const transformedSource = transformedSourceStringArr.join('');

  this.callback(null, transformedSource, map, meta);

  return;
};

module.exports = metaLoader;
