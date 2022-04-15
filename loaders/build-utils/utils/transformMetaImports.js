// Utils
const parseWord = require('./parseWord')
const parseWhitespace = require('./parseWhitespace');
const transformComment = require('./transformComment');
const getMetaResourcePath = require('./getMetaResourcePath');
const getRelativePath = require('./getRelativePath');

const transformMetaImports = ({ source, index, resourcePath, rootDir }) => {
  const metaImportsStringArr = [];
  const varNames = [];

  while(index < source.length) {
    if(source[index] === ' ') {
      const { whitespace, parsedIndex } = parseWhitespace({ source, index });

      metaImportsStringArr.push(whitespace);
      index = parsedIndex;
    }
    else if(source[index] === '#') {
      const { comment, parsedIndex } = transformComment({ source, index });

      metaImportsStringArr.push(comment);
      index = parsedIndex;
    }
    else if(source[index] === '\n') {
      metaImportsStringArr.push('\n');
      index ++;
    }
    else {
      const { word, parsedIndex: wordParsedIndex } = parseWord({ source, index });
      if(word !== 'meta') {
        break;
      }

      const { parsedIndex: whitespaceParsedIndex } = parseWhitespace({ source, index: wordParsedIndex });
      const { word: filename, parsedIndex: filenameParsedIndex } = parseWord({ source, index: whitespaceParsedIndex });

      const metaResourcePath = getMetaResourcePath({ filename, rootDir });
      const relativePath = getRelativePath({ fromPath: resourcePath, toPath: metaResourcePath });

      const varName = `meta${varNames.length}`;
      varNames.push(varName);

      const importString = `import ${varName} from '${relativePath}'\n`;
      metaImportsStringArr.push(importString);
      index = filenameParsedIndex;
    }
  }

  return { 
    metaImports: metaImportsStringArr.join(''),
    parsedIndex: index,
    varNames
  };
};

module.exports = transformMetaImports;
