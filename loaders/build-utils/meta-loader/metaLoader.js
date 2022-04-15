// Utils
import { transformMetaImports } from '../utils/transformMetaImports';
import { transformProperties } from '../utils/transformProperties';

/**
 * 
 * @param {string} [source] Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
export const metaLoader = (source, map, meta) => {

  let index = 0;
  let transformedSourceStringArr = [];

  const { metaImports, parsedIndex: metaImportsIndex, vars } = transformMetaImports({
    source,
    index,
    resourcePath: this.resourcePath,
    rootDir: this.context
  });
  transformedSourceStringArr.push(metaImports);
  index = metaImportsIndex;

  const { properties, parsedIndex: propertiesIndex } = transformProperties({
    source,
    index
  })
  transformedSourceStringArr.push(properties);
  index = propertiesIndex;

  // this.callback(null, source, map, meta);

  return;
};
