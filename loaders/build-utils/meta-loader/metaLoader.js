// Utils
import { transformMetaImports } from '../utils/transformMetaImports';
import { transformProperties } from '../utils/transformProperties';
import { getMergingMetadataCode } from '../utils/getMergingMetadataCode';

/**
 * 
 * @param {string} [source] Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
export const metaLoader = (source, map, meta) => {

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
