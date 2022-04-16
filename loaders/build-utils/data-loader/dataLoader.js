// Utils
const transformMetaImports = require('../utils/transformMetaImports');
const getMergingMetadataCode = require('../utils/getMergingMetadataCode');
const transformFieldProperty = require('./utils/transformFieldProperty');
const transformData = require('./utils/transformData');
const getTransformedDataVarCode = require('./utils/getTransformedDataVarCode');
const getExportDataAndMetadataCode = require('./utils/getExportDataAndMetadataCode');

/**
 * 
 * @param {string} [source] Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
function dataLoader (source, map, meta) {

  let index = 0;
  let transformedSourceStringArr = [];

  const { metaImports, parsedIndex: metaImportsIndex, varNames } = transformMetaImports({
    source,
    index,
    resourcePath: this.resourcePath,
    rootDir: process.cwd() + '/src'
  });
  transformedSourceStringArr.push(metaImports);
  index = metaImportsIndex;
  
  const { code: mergingMetadataCode, mergedMetadataVarName } = getMergingMetadataCode(varNames);
  transformedSourceStringArr.push(mergingMetadataCode);

  const { fieldsCode, parsedIndex: fieldsCodeParsedIndex, fields } = transformFieldProperty({
    source,
    index
  });
  transformedSourceStringArr.push(fieldsCode);
  index = fieldsCodeParsedIndex;

  const { dataCode, parsedIndex: dataCodeParsedIndex, data } = transformData({
    source,
    index 
  });
  transformedSourceStringArr.push(dataCode);
  index = dataCodeParsedIndex;

  const { code: dataVarCode, dataVarName } = getTransformedDataVarCode({
    fields,
    data
  });
  transformedSourceStringArr.push(dataVarCode);
  
  const exportDataAndMetadataCode = getExportDataAndMetadataCode({
    metaVarName: mergedMetadataVarName,
    dataVarName
  });
  transformedSourceStringArr.push(exportDataAndMetadataCode);

  const transformedSource = transformedSourceStringArr.join('');

  this.callback(null, transformedSource, map, meta);

  return;
};

module.exports = dataLoader;
