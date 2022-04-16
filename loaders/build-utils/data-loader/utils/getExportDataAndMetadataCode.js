const getExportDataAndMetadataCode = ({ metaVarName, dataVarName }) => `
  const dataAndMetadata = {
    meta: ${metaVarName},
    data: ${dataVarName}
  };

  export default dataAndMetadata;
`;

module.exports = getExportDataAndMetadataCode;
