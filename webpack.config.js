const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',  // Убедитесь, что путь к вашему входному файлу указан правильно
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
