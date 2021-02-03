import { Configuration } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  entry: {
    posts: './src/posts.tsx',
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.pug$/, loader: 'pug-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      chunks: ['posts'],
      template: 'template.pug',
      filename: 'posts.html',
    }),
  ],
};

export default config;
