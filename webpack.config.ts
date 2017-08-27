import * as path from 'path';
import { Configuration, optimize } from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const config: Configuration = {
  entry: {
    'examples/MDN_Form_validation/App': './examples/MDN_Form_validation/App.tsx',
    'examples/moduscreate/App': './examples/moduscreate/App.jsx',
    'examples/NativeFormWidgets/App': './examples/NativeFormWidgets/App.tsx',
    'examples/password/App': './examples/password/App.tsx',
    'examples/HttpStatusCode/App': './examples/HttpStatusCode/App.tsx',

    'react-form-with-constraints': './index.ts',
    react: ['react', 'prop-types', 'react-dom']
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  plugins: [
    new optimize.CommonsChunkPlugin({names: ['react-form-with-constraints', 'react', 'manifest']}),
    new ExtractTextPlugin({filename: '[name].css'})
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: {compilerOptions: {declaration: false}} },
      { test: /\.jsx?$/, loader: 'babel-loader', options: {presets: ['react']} },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  }
};

export = config;
