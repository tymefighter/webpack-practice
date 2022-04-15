// Utils
const parseWord = require('./parseWord');
const parseLine = require('./parseLine');
const parseWhitespace = require('./parseWhitespace');
const transformComment = require('./transformComment');

const transformProperties = ({ source, index }) => {
  const propertiesStringArr = [];
  const propertyNameVsValueMap = {};
  const propsVarName = 'props';

  while(index < source.length) {
    if(source[index] === ' ') {
      const { whitespace, parsedIndex } = parseWhitespace({ source, index });

      propertiesStringArr.push(whitespace);
      index = parsedIndex;
    }
    else if(source[index] === '#') {
      const { comment, parsedIndex } = transformComment({ source, index });

      propertiesStringArr.push(comment);
      index = parsedIndex;
    }
    else if(source[index] === '\n') {
      propertiesStringArr.push('\n');
      index ++;
    }
    else {
      const { word, parsedIndex: wordParsedIndex } = parseWord({ source, index });
      if(!word.endsWith(':')) {
        break;
      }

      const propertyName = word.substring(0, word.length - 1);
      const { line, parsedIndex: lineParsedIndex } = parseLine({ source, index: wordParsedIndex });

      const propertyValues = line
        .trim()
        .split(',');

      propertyNameVsValueMap[propertyName] = propertyValues;
      index = lineParsedIndex;
    }
  }

  if(!propertyNameVsValueMap.fields) {
    throw new Error('fields not defined in meta file');
  }

  const { fields } = propertyNameVsValueMap
  const fieldNameVsIndexMap = {};
  fields.map((fieldName, index) => fieldNameVsIndexMap[fieldName] = index);

  const propertyNames = Object.keys(propertyNameVsValueMap);
  const properties = `
    const ${propsVarName} = {
      ${fields.map(fieldName => `
        ${fieldName}: {
          ${propertyNames.map(propertyName => `${propertyName}: '${propertyNameVsValueMap[propertyName][fieldNameVsIndexMap[fieldName]]}'`)}
        }
      `)}
    }
  `;

  propertiesStringArr.push(properties);

  return {
    properties: propertiesStringArr.join(''),
    parsedIndex: index,
    propsVarName
  }
};

module.exports = transformProperties;
