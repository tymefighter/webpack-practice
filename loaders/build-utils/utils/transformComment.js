const transformComment = ({ source, index }) => {
  if(index === source.length || source[index] !== '#') {
    return {
      comment: '',
      parsedIndex: index
    };
  }

  let parsedIndex = index + 1;
  while(parsedIndex < source.length && source[parsedIndex] !== '\n') {
    parsedIndex ++;
  }
  
  if(parsedIndex < source.length) {
    parsedIndex ++;
  }

  return {
    comment: '//' + source.substring(index + 1, parsedIndex),
    parsedIndex
  };
}

module.exports = transformComment;
