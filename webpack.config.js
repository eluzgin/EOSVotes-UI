const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

  entry: [
    'babel-polyfill',
    'style-loader!./src/style/vendor.scss',
    'style-loader!./src/style/style.scss',
    'style-loader!./src/icons/icons',
    './src/app/polyfill.js',
    './src/app/main.js',
    './src/index-html/index.html',

    // remove later
    // './dummy/referendums-0.json',
    // './dummy/referendums-1.json',
  ],

  output: {
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(png|jpg|woff|svg)$/i,
        rules: [
          {
            issuer: /\.html/,
            use: ['file-loader?name=[path][name].[ext]'],
          },
          {
            issuer: /\.(scss)/,
            use: ['url-loader?limit=500000&name=[path][name].[ext]'],
          },
        ]
      },
      {
        test: /\.rt$/,
        use: 'react-templates-loader?modules=amd',
      },
      {
        test: /icons$/,
        use: ['css-fast-loader', 'webfonts-loader'],
      },
      {
        test: /\.scss$/,
        use: ['css-fast-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.html/,
        use: ['file-loader?name=[name].html', 'extract-loader', 'html-loader?minimize&minifyCSS=false&interpolate&attrs=:href']
      },

      //remove later
      {
        type: 'javascript/auto',
        test: /dummy.*\.json$/,
        use: 'file-loader?name=[path][name].[ext]',
      },

    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src/app'),
      path.resolve('./node_modules'),
      path.resolve(__dirname, "node_modules"),  //dont bloody touch these - needed for scatter
      'node_modules'                            //dont bloody touch these - needed for scatter
    ]
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve('./dist')),
    new Dotenv(),
  ],

  performance: {
    hints: false
  },

  devServer: {
    overlay: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
  }

};
