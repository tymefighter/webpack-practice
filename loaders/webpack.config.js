module.exports = {
  module: {
    rules: [
      {
        test: /\.meta$/,
        use: __dirname + '/build-utils/meta-loader'
      }
    ]
  }
};
