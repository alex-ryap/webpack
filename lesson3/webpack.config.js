const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, 'src', 'main.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'img-optimize-loader',
            options: {
              outputPath: 'media/images',
              compress: {
                mode: 'high',
                webp: true,
                gifsicle: true,
                disableOnDevelopment: false,
              },
            },
          },
        ],
      },
      {
        test: /\.mp3$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'media/audio',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.mp4$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'media/video',
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};
