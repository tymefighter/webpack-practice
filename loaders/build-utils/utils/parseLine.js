export const parseLine = ({ source, index }) => {
  if(index === source.length || source[index] === '\n') {
    return {
      line: '',
      parsedIndex: index
    };
  }

  let parsedIndex = index;
  while(parsedIndex < source.length && source[parsedIndex] !== '\n') {
    parsedIndex ++;
  }

  if(parsedIndex < source.length) {
    parsedIndex ++
  }

  return {
    line: source.substring(index, parsedIndex),
    parsedIndex
  };
};
