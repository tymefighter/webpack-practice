export const parseWord = ({ source, index }) => {
  if(index === source.length || source[index] === ' ') {
    return {
      word: '',
      parsedIndex: index
    };
  }

  let parsedIndex = index;
  while(parsedIndex < source.length && source[parsedIndex] !== ' ') {
    parsedIndex ++;
  }

  return {
    word: source.substring(index, parsedIndex),
    parsedIndex
  };
};
