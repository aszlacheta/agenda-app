const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const port = process.env.PORT || 3001;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: './'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My agenda app',
      template: './src/index.html',
      baseUrl: process.env.NODE_ENV === 'development' ? '/' : 'https://aszlacheta.github.io/agenda-app/'
    }),
    new Dotenv()
  ],
  devServer: {
    host: 'localhost',
    port,
    historyApiFallback: true,
    open: true
  }
};
