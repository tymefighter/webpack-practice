const getTransformedDataVarCode = ({ fields, data }) => {
  const transformedData = data.map(
    dataRow => fields.reduce(
      (dataRowObject, fieldName, index) => {
        dataRowObject[fieldName] = dataRow[index];
        return dataRowObject;
      },
      {}
    )
  );

  const dataVarName = 'data';

  const code = `
    const ${dataVarName} = ${JSON.stringify(transformedData, undefined, 2)}
  `;

  return {
    code,
    dataVarName
  }
};

module.exports = getTransformedDataVarCode;
