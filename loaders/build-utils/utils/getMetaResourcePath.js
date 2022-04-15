const fs = require('fs');

const searchDir = ({ dir, searchFilename }) => {
  for(const filename of fs.readdirSync(dir)) {
    const filePath = `${dir}/${filename}`;
    const stat = fs.statSync(filePath);

    if(stat.isDirectory()) {
      const foundFilePath = searchDir({
        dir: filePath,
        searchFilename
      });

      if(foundFilePath) {
        return foundFilePath;
      }
    }
    else if(filename === searchFilename) {
      return filePath;
    }
  }

  return undefined;
}

const getMetaResourcePath = ({ rootDir, filename }) => searchDir({
  dir: rootDir,
  searchFilename: filename
})

module.exports = getMetaResourcePath;
