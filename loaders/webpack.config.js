module.exports = {
  module: {
    rules: [
      {
        test: /\.meta$/,
        use: __dirname + '/build-utils/meta-loader'
      },
      {
        test: /\.data$/,
        use: __dirname + '/build-utils/data-loader'
      }
    ]
  }
};
