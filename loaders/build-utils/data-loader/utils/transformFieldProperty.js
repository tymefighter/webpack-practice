// Utils
const parseWord = require('../../utils/parseWord');
const parseWhitespace = require('../../utils/parseWhitespace');
const parseLine = require('../../utils/parseLine');

const transformFieldProperty = ({ source, index }) => {

  const fieldsStringArr = [];
  let fields = [];

  while(index < source.length) {
    if(source[index] === ' ') {
      const { whitespace, parsedIndex } = parseWhitespace({ source, index });

      fieldsStringArr.push(whitespace);
      index = parsedIndex;
    }
    else if(source[index] === '#') {
      const { comment, parsedIndex } = transformComment({ source, index });

      fieldsStringArr.push(comment);
      index = parsedIndex;
    }
    else if(source[index] === '\n') {
      fieldsStringArr.push('\n');
      index ++;
    }
    else {
      const { word, parsedIndex: wordParsedIndex } = parseWord({ source, index });
      if(word !== 'field:') {
        break;
      }

      const { line, parsedIndex: lineParsedIndex } = parseLine({ source, index: wordParsedIndex });

      fields = line
        .trim()
        .split(',');

      index = lineParsedIndex;

      break;
    }
  }

  return {
    fieldsCode: fieldsStringArr.join(''),
    parsedIndex: index,
    fields
  };
};

module.exports = transformFieldProperty;
