// Utils
const parseWord = require('../../utils/parseWord');
const parseWhitespace = require('../../utils/parseWhitespace');
const parseLine = require('../../utils/parseLine');

const transformFieldProperty = ({ source, index }) => {

  const dataArr = [];
  const data = [];

  while(index < source.length) {
    if(source[index] === ' ') {
      const { whitespace, parsedIndex } = parseWhitespace({ source, index });

      dataArr.push(whitespace);
      index = parsedIndex;
    }
    else if(source[index] === '#') {
      const { comment, parsedIndex } = transformComment({ source, index });

      dataArr.push(comment);
      index = parsedIndex;
    }
    else if(source[index] === '\n') {
      dataArr.push('\n');
      index ++;
    }
    else {
      const { line, parsedIndex } = parseLine({ source, index: wordParsedIndex });

      dataRow = line
        .trim()
        .split(',');
      data.push(dataRow);

      index = parsedIndex;
    }
  }

  return {
    dataCode: dataArr.join(''),
    parsedIndex: index,
    data
  };
};

module.exports = transformFieldProperty;
