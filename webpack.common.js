const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'meetbox.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'meetbox',
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
