export const getRelativePath = ({ fromPath, toPath }) => {
  const fromPathArr = fromPath.split('/');
  const toPathArr = toPath.split('/');

  let index = 0;
  while(fromPathArr[index] === toPathArr[index]) {
    index ++;
  }

  if(index === fromPathArr.length || index === toPathArr.length) {
    throw new Error('one path is subset of other, which is not possible')
  }

  let relativePath;
  if(index === fromPathArr.length - 1) {
    relativePath = './';
  }
  else {
    relativePath = '../'.repeat(fromPathArr.length - 1 - index);
  }

  relativePath += toPathArr.slice(index).join('/');

  return relativePath;
}