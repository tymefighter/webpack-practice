// Utils
import { parseWord } from './parseWord';
import { parseWhitespace } from './parseWhitespace';
import { transformComment } from './transformComment';
import { getMetaResourcePath } from './getMetaResourcePath';
import { getRelativePath } from './getRelativePath';

export const transformMetaImports = ({ source, index, resourcePath, rootDir }) => {
  const metaImportsStringArr = [];
  const vars = [];

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

      const varName = `meta${vars.length}`;
      vars.push(varName);

      const importString = `import ${varName} from ${relativePath}\n`;
      metaImportsStringArr.push(importString);
      index = filenameParsedIndex;
    }
  }

  return { 
    metaImports: metaImportsStringArr.join(''),
    parsedIndex: index,
    vars
  };
};

