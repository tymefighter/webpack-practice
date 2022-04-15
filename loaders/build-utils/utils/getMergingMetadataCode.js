export const getMergingMetadataCode = varNames => {

  const mergedMetadataVarName = 'mergedMetadata';

  const code = 
    ```
      const ${mergedMetadataVarName} = {};

      ${varNames.map(varName =>
        ```
          Object.keys(${varName}).forEach(fieldName => {
            ${mergedMetadataVarName}[fieldName] = {
              ...${mergedMetadataVarName}[fieldName],
              ...${varName}[fieldName]
            } 
          })
        ```
      )}

    ```;

  return {
    code,
    mergedMetadataVarName
  };
}