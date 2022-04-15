export const parseWhitespace = ({ source, index }) => {
  if(index === source.length || source[index] !== ' ') {
    return {
      whitespace: '',
      parsedIndex: index
    };
  }

  let parsedIndex = index;
  while(parsedIndex < source.length && source[parsedIndex] === ' ') {
    parsedIndex ++;
  }

  return {
    whitespace: source.substring(index, parsedIndex),
    parsedIndex
  };
};
