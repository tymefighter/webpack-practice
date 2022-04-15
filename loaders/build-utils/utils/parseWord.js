const parseWord = ({ source, index }) => {
  if(index === source.length || source[index] === ' ' || source[index] === '\n') {
    return {
      word: '',
      parsedIndex: index
    };
  }

  let parsedIndex = index;
  while(parsedIndex < source.length && source[parsedIndex] !== ' ' && source[parsedIndex] !== '\n') {
    parsedIndex ++;
  }

  return {
    word: source.substring(index, parsedIndex),
    parsedIndex
  };
};

module.exports = parseWord;
